-- Table: public.calandrier
DROP TABLE public.Calandrier;
CREATE TABLE public.Calandrier
(
  id SERIAL NOT NULL,
  image text NOT NULL,
  imageAlt text NOT NULL,
  contenue text NOT NULL,
  titleText text NOT NULL,
  CONSTRAINT Calandrier_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);