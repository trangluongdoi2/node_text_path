import { decryptData } from "@/helper/cryto";
import { MasterElement, PagePayloadData } from "@/types";
import { PageSection } from "@/types/API";

export default class DesignService {
  private static decryptPageSectionPayload(payload: string | undefined | null, orgId: string): PagePayloadData {
    const encryptedPayload = payload ?? '{}';
    let decryptedPayload: PagePayloadData = {
      objectMap: { dataType: 'Map', value: [] },
      orderArray: [],
    };

    try {
      const payload = decryptData(encryptedPayload, orgId);
      decryptedPayload = payload ? JSON.parse(payload) : decryptedPayload;
    } catch (error) {
      console.error(`>>>DesignService: decryptPageSectionPayload(): failed to decrypt payload for pageSection: `, error);
    }
    return decryptedPayload;
  }

  static async getListMasterElementsFromPageSections(pageSections: PageSection[], orgId: string): Promise<Array<MasterElement[]>> {
    const result: Array<MasterElement[]> = [];
    for (let sectionIndex = 0; sectionIndex < pageSections.length; sectionIndex++) {
      const pagePayloadData = this.decryptPageSectionPayload(pageSections[sectionIndex].payload, orgId);
      const listElements = Array.from(pagePayloadData.objectMap.value, ([, val]) => val) as MasterElement[];
      result[sectionIndex] = listElements;
    }
    return result;
  }
}