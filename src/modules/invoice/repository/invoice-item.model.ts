import { Model, Column, PrimaryKey, Table, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

    @Table({
      tableName: 'invoiceItem',
      timestamps: false
    })
    export class InvoiceItemModel extends Model {

        
      @PrimaryKey
      @Column({ allowNull: false })         
      declare id: string;

      @Column({ allowNull: false })
      declare name: string;

      @Column({ allowNull: false })
      declare price: number;

      @Column({ allowNull: false })
      declare createdAt: Date;

      @Column({ allowNull: false })
      declare updatedAt: Date;

      @ForeignKey(() => InvoiceModel)
      @Column({
         type: DataType.STRING,
         allowNull: true,
      })
      declare invoiceId: string;

      @BelongsTo(()=>InvoiceModel)
      declare invoice:InvoiceModel;
    }