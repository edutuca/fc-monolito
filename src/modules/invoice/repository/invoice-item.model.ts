import { Model, Column, PrimaryKey, Table, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

    @Table({
      tableName: 'invoiceItem',
      timestamps: false
    })
    export class InvoiceItemModel extends Model {

        
      @PrimaryKey
      @Column({ allowNull: false })         
      id: string;

      @Column({ allowNull: false })
      name: string;

      @Column({ allowNull: false })
      price: number;

      @Column({ allowNull: false })
      createdAt: Date;

      @Column({ allowNull: false })
      updatedAt: Date;

      @ForeignKey(() => InvoiceModel)
      @Column({
         type: DataType.STRING,
         allowNull: true,
      })
      invoiceId: string;

      @BelongsTo(()=>InvoiceModel)
      invoice:InvoiceModel;
    }