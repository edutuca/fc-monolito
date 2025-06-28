import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  modelName: 'products-catalog-table',
  tableName: "products",
  timestamps: false
})
export class ProductCatalogModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: true })
  declare salesPrice: number;

  @Column({ allowNull: false })
  declare createdAt: Date;

}
