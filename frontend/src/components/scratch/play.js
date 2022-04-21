const users = new Map();
users.set(1, "Aly");
users.set(2, "Raiyan");
users.set(3, "Tawheed");

[...users.keys()].map((userId, index) => {
    console.log(userId+"->"+users.get(userId));
    console.log("Index: "+index);
});