export interface CentreType {
  KeyID: number;
  KeyValueDec: string;
  wcen_classes_type: string[];
}

export const centreTypes: CentreType[] = [
  {
    KeyID: 2428,
    KeyValueDec: "Spiritual Centre",
    wcen_classes_type: [],
  },
  {
    KeyID: 938,
    KeyValueDec: "Satsang Centre",
    wcen_classes_type: [],
  },
  {
    KeyID: 939,
    KeyValueDec: "Children Centre",
    wcen_classes_type: [
      "Arhat Touch",
      "E Cube",
      "Magictouch",
      "Spiritualtouch",
    ],
  },
  {
    KeyID: 940,
    KeyValueDec: "Youth Centre",
    wcen_classes_type: [],
  },
  {
    KeyID: 2669,
    KeyValueDec: "Seva Centre",
    wcen_classes_type: [],
  },
  {
    KeyID: 3017,
    KeyValueDec: "ICWJ Centre",
    wcen_classes_type: [],
  },
];
