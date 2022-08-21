--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dwarf_planets_in_solar_system; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.dwarf_planets_in_solar_system (
    dwarf_planets_in_solar_system_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text
);


ALTER TABLE public.dwarf_planets_in_solar_system OWNER TO freecodecamp;

--
-- Name: dwarf_planets_in_solar_system_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.dwarf_planets_in_solar_system_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dwarf_planets_in_solar_system_id_seq OWNER TO freecodecamp;

--
-- Name: dwarf_planets_in_solar_system_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.dwarf_planets_in_solar_system_id_seq OWNED BY public.dwarf_planets_in_solar_system.dwarf_planets_in_solar_system_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(45) NOT NULL,
    distance_in_ly integer NOT NULL,
    trillion_solar_mass numeric(4,3) NOT NULL,
    diameter_in_ly integer NOT NULL,
    description text,
    known_life boolean NOT NULL,
    explored boolean NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30),
    orbital_period_in_days integer NOT NULL,
    description text,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30),
    orbital_period_in_days integer NOT NULL,
    description text,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30),
    distance_in_ly integer NOT NULL,
    description text,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: dwarf_planets_in_solar_system dwarf_planets_in_solar_system_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.dwarf_planets_in_solar_system ALTER COLUMN dwarf_planets_in_solar_system_id SET DEFAULT nextval('public.dwarf_planets_in_solar_system_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: dwarf_planets_in_solar_system; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.dwarf_planets_in_solar_system VALUES (1, 'Pluto', 'Was demoted in 2006 from planet to dwarf planet');
INSERT INTO public.dwarf_planets_in_solar_system VALUES (2, 'Eris', 'Actually the planet that got discovered in 2005 and made the specialists rethink Plutos position in the Solar System');
INSERT INTO public.dwarf_planets_in_solar_system VALUES (3, 'Ceres', 'Found in the asteroid belt between Mars and Jupiter, it alone makes for one third of the belts mass');
INSERT INTO public.dwarf_planets_in_solar_system VALUES (4, 'Makemake', 'This dwarf planet takes 300 years to complete its trip around the Sun');
INSERT INTO public.dwarf_planets_in_solar_system VALUES (5, 'Haumea', 'Scientists believe that its egg shape is caused by its fast rotation speed - it completes a spin unto itself in under 4 hours');

--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 0, 1.500, 100000, 'Milky Way is the name of the galaxy where planet  Earth is located', true, true);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 2500000, 1.000, 152000, 'Milky Way and Andromeda will collide in 5 billion years, and is so bright that is visible to the naked eye from  planet Earth', false, false);
INSERT INTO public.galaxy VALUES (3, 'LMC', 14000, 0.001, 158000, 'Magellanic-type dwarf spiral galaxy', false, false);
INSERT INTO public.galaxy VALUES (4, 'Cigar Galaxy', 11500000, 0.003, 37000, 'Has a supermassive black hole in its core', false, false);
INSERT INTO public.galaxy VALUES (5, 'Pinwheel Galaxy', 20870000, 0.001, 170000, 'Pierre Méchain, its discoverer, described it as a nebula without star, very obscure and pretty large', false, false);
INSERT INTO public.galaxy VALUES (6, 'Sombrero Galaxy', 30000000, 0.001, 50000, 'Has an overwhelming bright center in contrast to the intriguingly detailed dust band', false, false);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 27, 'The only place beyond Earth where humans managet to get yet', 3);
INSERT INTO public.moon VALUES (2, 'Deimos', 1, 'Small, lumpy, heavy cratered object', 4);
INSERT INTO public.moon VALUES (3, 'Europa', 3, 'Scientist believe that hidden beneath the icy surface of Europe there is a salt water ocean containing twice as much water as Earth has', 5);
INSERT INTO public.moon VALUES (4, 'Io', 2, 'This satellite is the most volcanically active object in the Solar System', 5);
INSERT INTO public.moon VALUES (5, 'Ganymede', 7, 'It is the largest moon in the Sola System', 5);
INSERT INTO public.moon VALUES (6, 'Callisto', 17, 'Has a potential habitat for life as there are carbon a hydrogen in its atmosphere and there are salt water lakes under its surface', 5);
INSERT INTO public.moon VALUES (7, 'Aitne', 736, 'Retrograde, eccentric, and inclined orbit', 5);
INSERT INTO public.moon VALUES (8, 'Ananke', 631, 'Discovered by S.Nicholson in 1951', 5);
INSERT INTO public.moon VALUES (9, 'Autonoe', 753, 'Discovered by S. Sheppard, D. Jewitt & J. Kleyna in 2001', 5);
INSERT INTO public.moon VALUES (10, 'Pasiphae', 735, 'Discovered by P. Melotte in 1908', 5);
INSERT INTO public.moon VALUES (11, 'Sinope', 758, 'Discovered by S. Nicholson in 1914', 5);
INSERT INTO public.moon VALUES (12, 'S/2011 J 2', 725, 'Discovered by Veillet in 2010', 5);
INSERT INTO public.moon VALUES (13, 'Aegir', 1116, 'Discovered by D. Jewitt, S. Sheppard & J. Kleyna in 2005', 6);
INSERT INTO public.moon VALUES (14, 'Calypso', 1888, 'Discovered by B. Smith in 1980', 6);
INSERT INTO public.moon VALUES (15, 'Dione', 2737, 'Discovered by G. Cassini in 1684', 6);
INSERT INTO public.moon VALUES (16, 'Hyperion', 21277, 'Discovered by W. Bond in 1848', 6);
INSERT INTO public.moon VALUES (17, 'Methone', 1, 'Discovered by C.C. Porco et al./ Cassini', 6);
INSERT INTO public.moon VALUES (18, 'Belinda', 66, 'Discovered by Voyager 2 in 1986', 7);
INSERT INTO public.moon VALUES (19, 'Miranda', 1414, 'Discovered by G. Kuiper in 1948', 7);
INSERT INTO public.moon VALUES (20, 'Oberon', 13463, 'Discovered by W. Herschel in 1787', 7);

--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 88, 'Smallest planet in the Solar System', 7);
INSERT INTO public.planet VALUES (2, 'Venus', 224, 'After the moon it is the brightest object in the night sky', 7);
INSERT INTO public.planet VALUES (3, 'Earth', 365, 'Our beloved planet', 7);
INSERT INTO public.planet VALUES (4, 'Mars', 686, 'This Red planet is the next target to space missions from Earth', 7);
INSERT INTO public.planet VALUES (5, 'Jupiter', 4328, 'Biggest planet in the Solar System', 7);
INSERT INTO public.planet VALUES (6, 'Saturn', 10725, 'Gas giant, one-eight the average density of Earth, but with 95 times its volume', 7);
INSERT INTO public.planet VALUES (7, 'Uranus', 3060, 'Ice giant that appears a white dorodango', 7);
INSERT INTO public.planet VALUES (8, 'Neptune', 60225, 'Dark and very windy ice giant, farthest known Solar Planet', 7);
INSERT INTO public.planet VALUES (9, 'Kepler-16b', 229, 'First example of a planet orbiting two stars', 8);
INSERT INTO public.planet VALUES (10, 'Kepler-22b', 290,'One of the first known transiting planet to orbit within the habitable zone of a Sun-like star where liquid water could exist on the planets surface', 9);
INSERT INTO public.planet VALUES (11, 'TRAPPIST-1 b', 1, 'Very similar in mass, radius and gravity to Earth', 10);
INSERT INTO public.planet VALUES (12, 'TRAPPIST-1 f', 9, 'Exoplanet that has been in an habitable zone for a long time, it is likely a glacial planet', 10);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Polaris', 430, 'Known as Pole Star, Lodestar and sometimes Guiding Star, it is the very close to the north celestial pole and thats why it has been used as a navigational tool', 1);
INSERT INTO public.star VALUES (2, 'Sirius', 7, 'Sirius is the brightest star in the night sky', 1);
INSERT INTO public.star VALUES (3, 'Alpha Centauri System', 4, 'Closest star system to Earth, consisted', 1);
INSERT INTO public.star VALUES (4, 'Betelgeuse', 720, 'Bright red supergiant, some are excited to observe it from earth when it turns into a supernova', 1);
INSERT INTO public.star VALUES (5, 'Rigel', 800, 'Blue supergiant 21 times more massive than our sun', 1);
INSERT INTO public.star VALUES (6, 'Vega', 25, 'White dwarf star roughly 2.1 times as massiva as ou sun', 1);
INSERT INTO public.star VALUES (7, 'Sun', 0, 'Our beloved star', 1);
INSERT INTO public.star VALUES (8, 'Kepler-16', 245, 'Eclipsing binary star system in the constellation of Cygnus', 1);
INSERT INTO public.star VALUES (9, 'Kepler-22', 635, 'G-type star, which is not visible from Earth');
INSERT INTO public.star VALUES (10, 'TRAPPIST-1', 41, 'Ultracool dwarf star');


--
-- Name: dwarf_planets_in_solar_system_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.dwarf_planets_in_solar_system_id_seq', 1, true);


--
-- Name: galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_id_seq', 2, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 1, false);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 1, false);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 1, false);


--
-- Name: dwarf_planets_in_solar_system dwarf_planets_in_solar_system_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.dwarf_planets_in_solar_system
    ADD CONSTRAINT dwarf_planets_in_solar_system_name_key UNIQUE (name);


--
-- Name: dwarf_planets_in_solar_system dwarf_planets_in_solar_system_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.dwarf_planets_in_solar_system
    ADD CONSTRAINT dwarf_planets_in_solar_system_pkey PRIMARY KEY (dwarf_planets_in_solar_system_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

