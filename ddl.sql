---------------------------------------
----        Create des tables      ----
---------------------------------------
-- Table: public.calandrier
DROP TABLE public.Calandrier;
CREATE TABLE public.Calandrier
(
    Id SERIAL NOT NULL,
    Image text NOT NULL,
    ImageAlt text NOT NULL,
    Contenue text NOT NULL,
    TitleText text NOT NULL,
    CONSTRAINT Calandrier_pkey PRIMARY KEY (Id)
)
WITH (
    OIDS=FALSE
);

-- Table: public.homeitems
DROP TABLE public.homeitems;
CREATE TABLE public.homeitems
(
    ID SERIAL NOT NULL,
    Ordre integer,
    Image text NOT NULL,
    ImageAlt text NOT NULL,
    Contenue text NOT NULL,
    Titre text NOT NULL,
    CONSTRAINT homeitems_pkey PRIMARY KEY (Id)
)
WITH (
    OIDS=FALSE
);
ALTER TABLE public.homeitems
    OWNER TO postgres;


-----------------------------------------
----        Autres informations      ----
-----------------------------------------

-- Table: public.admin
DROP TABLE public.Administrateur;
CREATE TABLE public.Administrateur
(
    id SERIAL NOT NULL,
    username text NOT NULL,
    password text NOT NULL
    CONSTRAINT Administrateur_pkey PRIMARY KEY (id)
)
WITH (
    OIDS=FALSE
);