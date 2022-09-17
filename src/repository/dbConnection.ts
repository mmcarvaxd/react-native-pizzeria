import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzariaa.db');
    return cx;
}

export function runMigrationProduct() {
    return new Promise((resolve, reject) => {
        const query = `
        CREATE TABLE IF NOT EXISTS tbProducts (
            id integer not null primary key AUTOINCREMENT,
            name text not null,
            description text not null,
            price decimal(10, 2) not null,
            category_id integer not null,
            is_deleted boolean not null default false
        
        );
        
        `;

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(
                query, [],
                (tx, resultado) => { resolve(true); }
            )
        }, error => {
            console.log(error);
            resolve(false);
        });
    });
}

export function runMigrationCategories() {
    return new Promise((resolve, reject) => {
        const query = `
        
        CREATE TABLE IF NOT EXISTS tbCategories (
            id integer not null primary key AUTOINCREMENT,
            description text not null,
            is_deleted boolean not null default false
        );
        
        `;

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(
                query, [],
                (tx, resultado) => { resolve(true); }
            )
        }, error => {
            console.log(error);
            resolve(false);
        });
    });
}

export function runMigrationCart() {
    return new Promise((resolve, reject) => {
        const query = `
        
        CREATE TABLE IF NOT EXISTS tbCart (
            id integer not null primary key AUTOINCREMENT,
            created_at DATE not null,
            is_finished boolean not null default false
        );
        
        `;

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(
                query, [],
                (tx, resultado) => { resolve(true); }
            )
        }, error => {
            console.log(error);
            resolve(false);
        });
    });
}

export function runMigrationCartProducts() {
    return new Promise((resolve, reject) => {
        const query = `
        
        CREATE TABLE IF NOT EXISTS tbCartProducts (
            id integer not null primary key AUTOINCREMENT,
            cart_id integer not null,
            product_id integer not null,
            quantity integer not null default 1
        );
        
        `;

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(
                query, [],
                (tx, resultado) => { resolve(true); }
            )
        }, error => {
            console.log(error);
            resolve(false);
        });
    });
}

export function execQuery(query: string, values: any[] = []): any {
    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, values,
                (tx, resultado) => {
                    resolve(resultado);
                })
        }, error => {
            reject(error);
        })
    });
}
