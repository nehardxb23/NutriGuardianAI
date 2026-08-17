import pymysql

try:
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="Kaveri123",
        database="nutriguardian",
        port=3306
    )

    print("✅ Connected to MySQL successfully!")

    connection.close()

except Exception as e:
    print("❌ Connection failed:")
    print(e)