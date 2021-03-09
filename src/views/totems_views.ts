import { ITotem } from "../models/Totem";

export default {
  render(totem: ITotem) {
    return {
      id: totem.id,
      name: totem.name,
      latitude: totem.latitude,
      longitude: totem.longitude,
    };
  },
  renderMany(totems: Array<ITotem>) {
    return totems.map((totem) => this.render(totem));
  },
};
