-- Table: public.images
-- DROP TABLE public.images;

CREATE TABLE public.images
(
  id SERIAL NOT NULL,
  image bytea,
  name text,
  imagealt text,
  CONSTRAINT image_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.images
  OWNER TO postgres;


-- Table: public.homeitems
-- DROP TABLE public.homeitems;

CREATE TABLE public.homeitems
(
  id SERIAL NOT NULL,
  ordre integer,
  contenue text NOT NULL,
  titre text NOT NULL,
  image integer,
  CONSTRAINT homeitems_pkey PRIMARY KEY (id),
  CONSTRAINT homeitems_fkey_image FOREIGN KEY (image)
      REFERENCES public.images (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.homeitems
  OWNER TO postgres;

-- Index: public.fki_homeitems_fkey_image
-- DROP INDEX public.fki_homeitems_fkey_image;

CREATE INDEX fki_homeitems_fkey_image
  ON public.homeitems
  USING btree
  (image);






-- Table: public.calendrier
-- DROP TABLE public.calendrier;

CREATE TABLE public.calendrier
(
  id SERIAL NOT NULL,
  contenue text NOT NULL,
  titletext text NOT NULL,
  image integer,
  CONSTRAINT calendrier_pkey PRIMARY KEY (id),
  CONSTRAINT "fk-calendrier_image" FOREIGN KEY (image)
      REFERENCES public.images (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.calendrier
  OWNER TO postgres;
