import { Model, Column, PrimaryKey, Table, ForeignKey, HasMany } from "sequelize-typescript";
import { InvoiceItemModel } from "./invoice-item.model";


@Table({
   tableName: 'invoice',
   timestamps: false
})
export class InvoiceModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })         
    declare id: string;
  
    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare number: string;

    @Column({ allowNull: false })
    declare complement: string;

    @Column({ allowNull: false })
    declare city: string;

    @Column({ allowNull: false })
    declare state: string;

    @Column({ allowNull: false })
    declare zipCode: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

    @HasMany(()=>InvoiceItemModel, {foreignKey:'invoiceId'})
    declare items:InvoiceItemModel[];
 }    