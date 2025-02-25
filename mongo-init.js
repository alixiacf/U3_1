db.auth('root', 'supersecreta')

db = db.getSiblingDB('admin')

db.createUser({
  user: "daw",
  pwd: "abc123.",
  roles: ["userAdminAnyDatabase", "readWriteAnyDatabase"]
})
