--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

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
-- Name: classes; Type: TABLE; Schema: public; Owner: nishad
--

CREATE TABLE public.classes (
    class_id integer NOT NULL,
    teacher_id integer,
    class_date date NOT NULL,
    class_start_at time without time zone NOT NULL,
    class_end_at time without time zone NOT NULL
);


ALTER TABLE public.classes OWNER TO nishad;

--
-- Name: classes_class_id_seq; Type: SEQUENCE; Schema: public; Owner: nishad
--

CREATE SEQUENCE public.classes_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.classes_class_id_seq OWNER TO nishad;

--
-- Name: classes_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nishad
--

ALTER SEQUENCE public.classes_class_id_seq OWNED BY public.classes.class_id;


--
-- Name: participations; Type: TABLE; Schema: public; Owner: nishad
--

CREATE TABLE public.participations (
    participation_id integer NOT NULL,
    class_id integer,
    student_id integer,
    is_allowed boolean NOT NULL
);


ALTER TABLE public.participations OWNER TO nishad;

--
-- Name: participations_participation_id_seq; Type: SEQUENCE; Schema: public; Owner: nishad
--

CREATE SEQUENCE public.participations_participation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.participations_participation_id_seq OWNER TO nishad;

--
-- Name: participations_participation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nishad
--

ALTER SEQUENCE public.participations_participation_id_seq OWNED BY public.participations.participation_id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: nishad
--

CREATE TABLE public.sessions (
    session_id integer NOT NULL,
    user_id integer,
    session_token text NOT NULL,
    is_session boolean NOT NULL
);


ALTER TABLE public.sessions OWNER TO nishad;

--
-- Name: sessions_session_id_seq; Type: SEQUENCE; Schema: public; Owner: nishad
--

CREATE SEQUENCE public.sessions_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_session_id_seq OWNER TO nishad;

--
-- Name: sessions_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nishad
--

ALTER SEQUENCE public.sessions_session_id_seq OWNED BY public.sessions.session_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: nishad
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email character varying(50) NOT NULL,
    is_teacher boolean NOT NULL,
    password character varying(20) NOT NULL
);


ALTER TABLE public.users OWNER TO nishad;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: nishad
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO nishad;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nishad
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: classes class_id; Type: DEFAULT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.classes ALTER COLUMN class_id SET DEFAULT nextval('public.classes_class_id_seq'::regclass);


--
-- Name: participations participation_id; Type: DEFAULT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.participations ALTER COLUMN participation_id SET DEFAULT nextval('public.participations_participation_id_seq'::regclass);


--
-- Name: sessions session_id; Type: DEFAULT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.sessions ALTER COLUMN session_id SET DEFAULT nextval('public.sessions_session_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: nishad
--

COPY public.classes (class_id, teacher_id, class_date, class_start_at, class_end_at) FROM stdin;
3	11	2021-05-04	10:45:00	11:45:00
2	11	2021-05-06	10:45:00	11:45:00
\.


--
-- Data for Name: participations; Type: TABLE DATA; Schema: public; Owner: nishad
--

COPY public.participations (participation_id, class_id, student_id, is_allowed) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: nishad
--

COPY public.sessions (session_id, user_id, session_token, is_session) FROM stdin;
22	11	9d3348d508f9c79c6ab7817c934e7c63953264304d386d3ea427af3750d0	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nishad
--

COPY public.users (id, name, email, is_teacher, password) FROM stdin;
1	Bhavik	bhavik@gmail.com	f	Abc@123
3	Bhavik	bhavik1@gmail.com	f	Abc@123
10	Bhavik	bhavik2@gmail.com	f	Abc@123
11	Bhavik	bhavik3@gmail.com	f	Abc@123
12	Bhavik	bhavik4@gmail.com	t	Abc@123
\.


--
-- Name: classes_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nishad
--

SELECT pg_catalog.setval('public.classes_class_id_seq', 3, true);


--
-- Name: participations_participation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nishad
--

SELECT pg_catalog.setval('public.participations_participation_id_seq', 1, true);


--
-- Name: sessions_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nishad
--

SELECT pg_catalog.setval('public.sessions_session_id_seq', 22, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nishad
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: classes classes_pkey; Type: CONSTRAINT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (class_id);


--
-- Name: participations participations_pkey; Type: CONSTRAINT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.participations
    ADD CONSTRAINT participations_pkey PRIMARY KEY (participation_id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: classes classes_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(id);


--
-- Name: participations participations_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.participations
    ADD CONSTRAINT participations_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(class_id) ON DELETE CASCADE;


--
-- Name: participations participations_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.participations
    ADD CONSTRAINT participations_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nishad
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

