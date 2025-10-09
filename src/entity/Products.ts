import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, type Relation } from "typeorm";
import { ProductCategories } from "./ProductCategories.js";
import { ProductSituations } from "./ProductSituations.js";

@Entity("products")
export class Products {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    productSituationId!: number;

    @Column()
    productCategoryId!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => ProductCategories, (category) => category.products)
    @JoinColumn({ name: "productCategoryId" })
    productCategory!: Relation<ProductCategories>;

    @ManyToOne(() => ProductSituations, (situation) => situation.products)
    @JoinColumn({ name: "productSituationId" })
    productSituation!: Relation<ProductSituations>;
}