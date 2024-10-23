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

source_cursor.execute('SELECT * FROM public.product_img')
rows = source_cursor.fetchall()

for row in rows:
    target_cursor.execute(
        "INSERT INTO product_img (id, image, product_id) VALUES (%s, %s, %s)",row
    )

target_conn.commit()

source_cursor.close()
source_conn.close()
target_cursor.close()
target_conn.close()