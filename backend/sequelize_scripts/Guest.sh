#!/bin/bash

npx sequelize model:generate --name Guest --attributes title:string,full_name:string,code:string --underscored