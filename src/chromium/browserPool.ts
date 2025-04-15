import * as fs from 'fs';
import { Browser, Page } from "puppeteer-core";
import { randomString } from "@/helper/string";

export class BrowserPool {
  private readonly MAX_BROWSERS = 5;
  private browsers: Browser[] = [];
  private browserUsage: Map<Browser, boolean> = new Map();

  private activeBrowsers = new Map<Browser, string>();

  public async getBrowser(): Promise<Browser> {
    for (const browser of this.browsers) {
      if (!this.browserUsage.get(browser)) {
        this.browserUsage.set(browser, true);
        return browser;
      }
    }

    if (this.browsers.length < this.MAX_BROWSERS) {
      const browser = await this.launchNewBrowser();
      this.browsers.push(browser);
      this.browserUsage.set(browser, true);
      return browser;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.getBrowser();
  }

  /**
   * Launches a new instance of headless Chromium if one doesn't already exist.
   * See this site for a description of each of these flags: https://peter.sh/experiments/chromium-command-line-switches/
   * Note: the `-webkit-print-color-adjust` flag is for Puppeteer's page.pdf() method (see https://developer.mozilla.org/en-US/docs/Web/CSS/print-color-adjust)
   *  It forces the PDF to generate with exact colors rather than adjusting them for print.
   * @returns a reference to the currently running puppeteer Browser
   */
  private async launchNewBrowser(): Promise<Browser> {
    const puppeteer = require('puppeteer-core');
    const chromium = require('@sparticuz/chromium');
    const profilePath = `/tmp/puppeteer_dev_chrome_profile-${randomString(false, 5)}-${Date.now()}`;

    const executablePath = await chromium.executablePath();
    console.log('launchNewBrowser(): executablePath: ', executablePath, profilePath);
    await fs.promises.mkdir(profilePath, { recursive: true }).catch(err => {
      console.error('Error creating profile directory:', err);
    });

    const args: string[] = [
      '-webkit-print-color-adjust',
      '--font-render-hinting=none',
      '--allow-pre-commit-input',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-component-extensions-with-background-pages',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-popup-blocking',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-sync',
      '--enable-automation',
      '--enable-blink-features=IdleDetection',
      '--export-tagged-pdf',
      '--force-color-profile=srgb',
      '--metrics-recording-only',
      '--no-first-run',
      '--password-store=basic',
      '--use-mock-keychain',
      '--disable-domain-reliability',
      '--disable-print-preview',
      '--disable-speech-api',
      '--mute-audio',
      '--no-default-browser-check',
      '--no-pings',
      '--single-process',
      '--disable-features=Translate,BackForwardCache,AcceptCHFrame,MediaRouter,OptimizationHints,AudioServiceOutOfProcess,IsolateOrigins,site-per-process',
      '--enable-features=NetworkServiceInProcess2,SharedArrayBuffer',
      '--hide-scrollbars',
      '--ignore-gpu-blocklist',
      '--in-process-gpu',
      '--use-gl=angle',
      '--allow-running-insecure-content',
      '--disable-setuid-sandbox',
      '--disable-site-isolation-trials',
      '--disable-web-security',
      '--no-sandbox',
      '--no-zygote',
      '--disable-gpu',
      '--enable-low-end-device-mode',
    ];

    const browser = await puppeteer.launch({
      args,
      executablePath,
      headless: true,
      userDataDir: profilePath,
      protocolTimeout: 15 * 60 * 1000 // 15 minutes
    });

    this.activeBrowsers.set(browser, profilePath);
    console.log(`Browser created with profile path: ${profilePath}`);
    return browser;
  }

  public isProfileActive(profilePath: string): boolean {
    return Array.from(this.activeBrowsers.values()).includes(profilePath);
  }

  public getActiveProfilePaths(): string[] {
    return Array.from(this.activeBrowsers.values());
  }

  public async cleanupTempChromiumDirs() {
    try {
      const tmpDir = '/tmp';
      const files = await fs.promises.readdir(tmpDir);
      const activeProfiles = this.getActiveProfilePaths();
      
      for (const file of files) {
        if (file.includes('puppeteer_dev_chrome_profile-')) {
          const path = `${tmpDir}/${file}`;
          
          // Only delete if the profile is not currently in use
          if (!activeProfiles.includes(path)) {
            console.log(`Cleaning up inactive Chromium directory: ${path}`);
            // Add retry mechanism for directory deletion
            let retries = 3;
            while (retries > 0) {
              try {
                // Force close any open file handles before deletion
                await new Promise(resolve => setTimeout(resolve, 100));
                await fs.promises.rm(path, { 
                  recursive: true, 
                  force: true,
                  maxRetries: 3,
                  retryDelay: 100
                });
                break;
              } catch (err) {
                retries--;
                if (retries === 0) {
                  console.error(`Failed to delete directory after 3 attempts: ${path}`, err);
                } else {
                  console.log(`Retry deleting directory: ${path}, attempts left: ${retries}`);
                  await new Promise(resolve => setTimeout(resolve, 500));
                }
              }
            }
          } else {
            console.log(`Skipping active Chromium directory: ${path}`);
          }
        }
      }
    } catch (error) {
      console.error('Error cleaning up temporary Chromium directories:', error);
    }
  }

  public async newPage(browser: Browser): Promise<Page> {
    const page = await browser.newPage();
    await page.metrics().then(metrics => {
      if (metrics.JSHeapUsedSize !== undefined) {
        console.log('JSHeapUsedSize:', Math.round(metrics.JSHeapUsedSize / 1024 / 1024), 'MB');
      } else {
        console.log('JSHeapUsedSize is undefined');
      }
      
      if (metrics.JSHeapTotalSize !== undefined) {
        console.log('JSHeapTotalSize:', Math.round(metrics.JSHeapTotalSize / 1024 / 1024), 'MB');
      } else {
        console.log('JSHeapTotalSize is undefined');
      }
    });
    
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    return page;
  }

  public async closePage(page?: Page | null) {
    if (!page) {
      return;
    }
    console.log('BrowserPool.closePage()');
    await page.close().catch(console.error);
  }

  public releaseBrowser(browser?: Browser | null) {
    if (!browser) {
      return;
    }
    
    console.log('BrowserPool.releaseBrowser()');
    const profilePath = this.activeBrowsers.get(browser);
    if (profilePath) {
      console.log(`Releasing browser with profile path: ${profilePath}`);
      this.activeBrowsers.delete(browser);
    }
    
    return browser.close().catch(err => {
      console.error('Error closing browser:', err);
    });
  }

  public async cleanup() {
    console.log('BrowserPool.cleanup()');
    const closingPromises = Array.from(this.activeBrowsers.keys()).map(browser => {
      return this.releaseBrowser(browser);
    });
    
    try {
      const cleanupTimeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Browser cleanup timeout')), 10000);
      });

      await Promise.race([
        Promise.all([
          ...closingPromises,
          this.cleanupTempChromiumDirs(),
        ]),
        cleanupTimeout
      ]);

      this.browsers = [];
      this.browserUsage.clear();
      this.activeBrowsers.clear();
    } catch (error) {
      console.error('Error during cleanup:', error);
      this.browsers = [];
      this.browserUsage.clear();
      this.activeBrowsers.clear();
    }
    console.log('BrowserPool.cleanup() complete');
  }
}