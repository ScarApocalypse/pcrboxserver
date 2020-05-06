const { querySql, queryOne } = require("../db");

function getRoles() {
  return querySql(`select * from roles `);
}

function getList() {
  return querySql(
    `select l.id,l.owner,r.name,l.power,l.rolesId,l.rank,l.stars,r.icon from role_list l, roles r where l.rolesId=r.id`
  );
}

function addBox(insertData) {
  console.log(insertData);
  let baseSql = `insert into role_list (owner,rolesId,name,rank,power,stars) value `;
  let value = [];
  insertData.forEach((item) => {
    value.push(
      `('${item.owner}',${item.roleId},'${item.name}',${item.rank},${item.power},${item.stars});`
    );
  });
  let sql = ``;
  value.forEach((item) => {
    sql = `${sql}${baseSql}${item}`;
  });

  return querySql(sql);
}

function boxExist(owner) {
  return querySql(`select owner from role_list where owner='${owner}'`);
}

function deleteBox(owner) {
  return querySql(`delete from role_list where owner='${owner}'`);
}

module.exports = {
  getRoles,
  getList,
  addBox,
  boxExist,
  deleteBox,
};
