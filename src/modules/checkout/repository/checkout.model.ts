import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "order",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare idClient: string;
  
  @Column({ allowNull: false })
  declare idProduct: string;
  
  @Column({ allowNull: false })
  declare status: string;
}
