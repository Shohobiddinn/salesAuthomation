interface idAndNameModel {
  id: string;
  name: string;
}

export interface refundTaraByIdModel {
  id: string | undefined;
  visual_id: number;
  client: idAndNameModel;
  agent: idAndNameModel;
  amount: 4;
  received_date: string;
  taras: string;
  status: {
    id: 3;
    name: string;
  };
  created_date: string;
  created_by: idAndNameModel;
  refund_items: [
    {
      tara: idAndNameModel;
      amount: number;
      id: string;
    }
  ];
  refund_notes: [];
}
