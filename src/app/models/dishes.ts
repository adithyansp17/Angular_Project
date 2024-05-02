export class Dishes {
  id: string;
  dName: string;
  price: number;
  r_id: string;
  img_path: string;
  isAvailable: boolean;

  constructor(
    id: string,
    n: string,
    p: number,
    rid: string,
    pa: string,
    isA: boolean
  ) {
    this.id = id;
    this.dName = n;
    this.price = p;
    this.r_id = rid;
    this.img_path = pa;
    this.isAvailable = isA;
  }
}
