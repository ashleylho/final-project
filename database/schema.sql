set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."snowboards" (
	"productId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"price" int NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"profileId" int NOT NULL,
	"flex" TEXT NOT NULL,
	"shapeId" int NOT NULL,
	"edgeTechId" int NOT NULL,
	"abilityLevel" TEXT NOT NULL,
	"terrain" json NOT NULL,
	CONSTRAINT "snowboards_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."sizes" (
	"productId" int NOT NULL,
	"size" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."profileTypes" (
	"profileId" serial NOT NULL,
	"profileName" TEXT NOT NULL,
	"profileDescription" TEXT NOT NULL,
	CONSTRAINT "profileTypes_pk" PRIMARY KEY ("profileId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."shapes" (
	"shapeId" serial NOT NULL,
	"shapeName" TEXT NOT NULL,
	"shapeDescription" TEXT NOT NULL,
	CONSTRAINT "shapes_pk" PRIMARY KEY ("shapeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."customer" (
	"customerId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"address2" TEXT,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"zip" TEXT NOT NULL,
	CONSTRAINT "customer_pk" PRIMARY KEY ("customerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orders" (
	"orderId" serial NOT NULL,
	"cartId" int NOT NULL,
	"customerId" int NOT NULL,
	"total" int NOT NULL,
	"timePurchased" timestamp with time zone NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."reviews" (
	"reviewId" serial NOT NULL,
	"productId" int NOT NULL,
	"rating" int NOT NULL,
	"reviewerName" TEXT NOT NULL,
	"productReview" TEXT,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."edgeTech" (
	"edgeTechId" serial NOT NULL,
	"edgeTechName" TEXT NOT NULL,
	"edgeTechDescription" TEXT NOT NULL,
	CONSTRAINT "edgeTech_pk" PRIMARY KEY ("edgeTechId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cartItems" (
	"cartId" int NOT NULL,
	"productId" int NOT NULL,
	"quantity" int NOT NULL,
	"size" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cart" (
	"cartId" serial NOT NULL,
	"purchased" BOOLEAN NOT NULL,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "snowboards" ADD CONSTRAINT "snowboards_fk0" FOREIGN KEY ("profileId") REFERENCES "profileTypes"("profileId");
ALTER TABLE "snowboards" ADD CONSTRAINT "snowboards_fk1" FOREIGN KEY ("shapeId") REFERENCES "shapes"("shapeId");
ALTER TABLE "snowboards" ADD CONSTRAINT "snowboards_fk2" FOREIGN KEY ("edgeTechId") REFERENCES "edgeTech"("edgeTechId");

ALTER TABLE "sizes" ADD CONSTRAINT "sizes_fk0" FOREIGN KEY ("productId") REFERENCES "snowboards"("productId");




ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("customerId") REFERENCES "customer"("customerId");

ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("productId") REFERENCES "snowboards"("productId");


ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk0" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk1" FOREIGN KEY ("productId") REFERENCES "snowboards"("productId");
