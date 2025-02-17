import { Page, Browser, Viewport } from 'puppeteer-core';

export class ChromiumHandler {
  private static browser: Browser | undefined = undefined;

  public static async asyncFunction() {
    // console.log('asyncFunction');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const a = 1 + 2;
        resolve(a);
      }, 1000);
    });
  }

  public static async launchBrowser() {
    if (!this.browser) {
      const puppeteer = require('puppeteer-core');
      const executablePath = '/opt/homebrew/bin/chromium';
      this.browser = <Browser>await puppeteer.launch({
        args: [
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
          //'--disk-cache-size=33554432',
          '--mute-audio',
          '--no-default-browser-check',
          '--no-pings',
          '--single-process',
          // eslint-disable-next-line max-len
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
        ],
        executablePath,
        headless: false,
      });

      console.log('Chromium version: ' + (await this.browser.version()));
    }
    return this.browser;
  }

  public static async newPage(input?: any, viewport?: Viewport): Promise<Page> {
    const browser = await this.launchBrowser();
    const page: Page = await browser.newPage();
    if (viewport) {
      await page.setViewport(viewport);
    }
    return page;
  }

  public static async destroy() {
    if (this.browser) {
      await this.browser.close();
      this.browser = undefined;
    }
  }
}
