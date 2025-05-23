PGDMP  !    5                }            project    17.5    17.5 !    E           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            F           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            G           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            H           1262    16389    project    DATABASE     z   CREATE DATABASE project WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE project;
                     postgres    false            �            1259    16412    requests    TABLE     �  CREATE TABLE public.requests (
    id integer NOT NULL,
    user_id integer,
    software_id integer,
    accesstype text,
    reason text,
    status text,
    CONSTRAINT requests_accesstype_check CHECK ((accesstype = ANY (ARRAY['Read'::text, 'Write'::text, 'Admin'::text]))),
    CONSTRAINT requests_status_check CHECK ((status = ANY (ARRAY['Pending'::text, 'Approved'::text, 'Rejected'::text])))
);
    DROP TABLE public.requests;
       public         heap r       postgres    false            �            1259    16411    requests_id_seq    SEQUENCE     �   CREATE SEQUENCE public.requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.requests_id_seq;
       public               postgres    false    218            I           0    0    requests_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.requests_id_seq OWNED BY public.requests.id;
          public               postgres    false    217            �            1259    16448    software    TABLE     %  CREATE TABLE public.software (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    version character varying(50) NOT NULL,
    description text NOT NULL,
    file_path character varying(255) NOT NULL,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.software;
       public         heap r       postgres    false            �            1259    16447    software_id_seq    SEQUENCE     �   CREATE SEQUENCE public.software_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.software_id_seq;
       public               postgres    false    222            J           0    0    software_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.software_id_seq OWNED BY public.software.id;
          public               postgres    false    221            �            1259    16488    software_requests    TABLE     X  CREATE TABLE public.software_requests (
    id integer NOT NULL,
    software_id integer NOT NULL,
    status character varying(50) DEFAULT 'Pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT software_requests_status_check CHECK (((status)::text = ANY ((ARRAY['Pending'::character varying, 'Approved'::character varying, 'Rejected'::character varying])::text[]))),
    CONSTRAINT status_check CHECK (((status)::text = ANY ((ARRAY['Pending'::character varying, 'Approved'::character varying, 'Rejected'::character varying])::text[])))
);
 %   DROP TABLE public.software_requests;
       public         heap r       postgres    false            �            1259    16487    software_requests_id_seq    SEQUENCE     �   CREATE SEQUENCE public.software_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.software_requests_id_seq;
       public               postgres    false    224            K           0    0    software_requests_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.software_requests_id_seq OWNED BY public.software_requests.id;
          public               postgres    false    223            �            1259    16438    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16437    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    220            L           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    219            �           2604    16415    requests id    DEFAULT     j   ALTER TABLE ONLY public.requests ALTER COLUMN id SET DEFAULT nextval('public.requests_id_seq'::regclass);
 :   ALTER TABLE public.requests ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            �           2604    16451    software id    DEFAULT     j   ALTER TABLE ONLY public.software ALTER COLUMN id SET DEFAULT nextval('public.software_id_seq'::regclass);
 :   ALTER TABLE public.software ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16491    software_requests id    DEFAULT     |   ALTER TABLE ONLY public.software_requests ALTER COLUMN id SET DEFAULT nextval('public.software_requests_id_seq'::regclass);
 C   ALTER TABLE public.software_requests ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            �           2604    16441    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            <          0    16412    requests 
   TABLE DATA           X   COPY public.requests (id, user_id, software_id, accesstype, reason, status) FROM stdin;
    public               postgres    false    218   �'       @          0    16448    software 
   TABLE DATA           Z   COPY public.software (id, name, version, description, file_path, uploaded_at) FROM stdin;
    public               postgres    false    222   �'       B          0    16488    software_requests 
   TABLE DATA           P   COPY public.software_requests (id, software_id, status, created_at) FROM stdin;
    public               postgres    false    224   6(       >          0    16438    users 
   TABLE DATA           I   COPY public.users (id, username, password, role, created_at) FROM stdin;
    public               postgres    false    220   �(       M           0    0    requests_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.requests_id_seq', 1, false);
          public               postgres    false    217            N           0    0    software_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.software_id_seq', 1, true);
          public               postgres    false    221            O           0    0    software_requests_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.software_requests_id_seq', 8, true);
          public               postgres    false    223            P           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public               postgres    false    219            �           2606    16421    requests requests_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.requests DROP CONSTRAINT requests_pkey;
       public                 postgres    false    218            �           2606    16456    software software_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.software
    ADD CONSTRAINT software_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.software DROP CONSTRAINT software_pkey;
       public                 postgres    false    222            �           2606    16496 (   software_requests software_requests_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.software_requests
    ADD CONSTRAINT software_requests_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.software_requests DROP CONSTRAINT software_requests_pkey;
       public                 postgres    false    224            �           2606    16445    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    220            �           2606    16497 4   software_requests software_requests_software_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.software_requests
    ADD CONSTRAINT software_requests_software_id_fkey FOREIGN KEY (software_id) REFERENCES public.software(id);
 ^   ALTER TABLE ONLY public.software_requests DROP CONSTRAINT software_requests_software_id_fkey;
       public               postgres    false    222    224    4774            <      x������ � �      @   c   x�%�M
� @ᵞ�$󣙝ō�ঢ`��m�l&�_S�χ�i������պN�i^Qb.Dm��8J#��h@\ .�!�w���{� �q      B   �   x�}�;�0 й>���7@�l4B0�
!�OW$����@ù?��ݧ��Xld>P��4B���7�TMiXëT�������{f�DBt}�>O����(�%5t�*��H�EH���5QT�Bm�9�����[$)rg�  |,E      >   �  x�u�˒�@ E��Y����4�c�a	f �He���AAůO*)S�Jfy��[I���s*��/\��K<z<���bGg��e���n0����.;Z����fm���\�O���O��=A����uDtBcT�2��j,���Y�ڳ�"��{�g�M����9v@D1�ڼ�mq��U8��Y2�����"��G{��\���Y��wI�1��jQ�J�<^��4?�����b�Q��W�.[���o���kb���P�ոy��Ə�3UtB �A.�_Ǧ�o�m�����tx��;����*�!��(yI����y$�`�꿾5�0�@9Ǫ&+RS���d�2�� 'k�����������Q����������t�zu�5���5�Q�2j��Ȳ��Z�r     