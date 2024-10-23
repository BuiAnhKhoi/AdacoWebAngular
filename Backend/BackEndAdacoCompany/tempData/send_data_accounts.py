import psycopg2

source_conn = psycopg2.connect(
    dbname='AdacoCompany',
    user ='postgres',
    password = '123456#A',
    host = 'localhost'
)

source_cursor = source_conn.cursor()

target_conn = psycopg2.connect(
        dbname='AdacoCompanyORM',
    user ='postgres',
    password = '123456#A',
    host = 'localhost'
)

target_cursor = target_conn.cursor()

source_cursor.execute('SELECT * FROM public.auth_user')
rows = source_cursor.fetchall()

for row in rows:
    target_cursor.execute(
        "INSERT INTO public.auth_user(id, password, last_login, is_superuser, username, first_name, last_name, gmail, is_staff, is_active, date_joined, tel, avatar, dob) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", row 
    )

target_conn.commit()

source_cursor.close()
source_conn.close()
target_cursor.close()
target_conn.close()