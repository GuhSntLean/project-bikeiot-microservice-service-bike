interface InterfaceBike {}

interface InterfaceResponseBike {
  id: string;
  serialnumber: string;
  mac: string;
  status: string;
  modelbike: string;
}

export { InterfaceBike, InterfaceResponseBike };
