export interface Descriptor {
  name?: string;
  uuid: BluetoothDescriptorUUID;
}

export interface Characteristic {
  name?: string;
  uuid: BluetoothCharacteristicUUID;
  descriptors?: Descriptor[];
}

export interface Service {
  uuid: BluetoothServiceUUID;
  characteristics: Characteristic[];
}
