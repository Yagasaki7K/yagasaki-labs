Config = {
    minTime = 30--[[ 30 ]], -- Precisa ta 30 minutos ON para resgatar o premio

    dailyRewards = {
        [1] = { -- DIA
            item = 'energetico', -- SPAWN DO ITEM
            itemName = 'Energetico', -- NOME DO ITEM
            amount = 2, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [2] = { -- DIA
            item = 'celular', -- SPAWN DO ITEM
            itemName = 'Celular', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [3] = { -- DIA
            item = 'pedecabra', -- SPAWN DO ITEM
            itemName = 'Pe de cabra', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [4] = { -- DIA
            item = 'money', -- SPAWN DO ITEM
            itemName = 'money', -- NOME DO ITEM
            amount = 50000, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end
        },

        [5] = { -- DIA
            item = 'attachs', -- SPAWN DO ITEM
            itemName = 'Attachs', -- NOME DO ITEM
            amount = 3, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [6] = { -- DIA
            item = 'ammo_pistol_mk2', -- SPAWN DO ITEM
            itemName = 'Munição de Five', -- NOME DO ITEM
            amount = 40, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [7] = { -- DIA
            item = 'weapon_pistol_mk2', -- SPAWN DO ITEM
            itemName = 'weapon_pistol_mk2', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [8] = { -- DIA
            item = 'roupas', -- SPAWN DO ITEM
            itemName = 'roupas', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [9] = { -- DIA
            item = 'algemas', -- SPAWN DO ITEM
            itemName = 'algemas', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [10] = { -- DIA
            item = 'lockpick', -- SPAWN DO ITEM
            itemName = 'Lockpick', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [11] = { -- DIA
            item = 'weapon_pistol_mk2', -- SPAWN DO ITEM
            itemName = 'weapon_pistol_mk2', -- NOME DO ITEM
            amount = 2, -- QUANTIDADE
            type = 'car', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.execute("creative/add_vehicle2",{ user_id = user_id, vehicle = item, tax = os.time(), plate = vRP.generatePlateNumber() })
            end 
        },

        [12] = { -- DIA
            item = 'ammo_pistol_mk2', -- SPAWN DO ITEM
            itemName = 'Munição Pistol MK2', -- NOME DO ITEM
            amount = 50, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [13] = { -- DIA
            item = 'camisinha', -- SPAWN DO ITEM
            itemName = 'camisinha ', -- NOME DO ITEM
            amount = 2, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [14] = { -- DIA
            item = 'repairkit', -- SPAWN DO ITEM
            itemName = 'repairkit', -- NOME DO ITEM
            amount = 3, -- QUANTIDADE
            type = 'car', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [15] = { -- DIA
            item = 'alianca', -- SPAWN DO ITEM
            itemName = 'Aliança', -- NOME DO ITEM
            amount = 2, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [16] = { -- DIA
            item = 'colete', -- SPAWN DO ITEM
            itemName = 'colete', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [17] = { -- DIA
            item = 'radio', -- SPAWN DO ITEM
            itemName = 'Radio', -- NOME DO ITEM
            amount = 3, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [18] = { -- DIA
            item = 'WEAPON_BAT', -- SPAWN DO ITEM
            itemName = 'WEAPON_BAT', -- NOME DO ITEM
            amount = 2, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [19] = { -- DIA
            item = 'weapon_pistol_mk2', -- SPAWN DO ITEM
            itemName = 'Weapon_pistol_mk2', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.execute("creative/add_vehicle2",{ user_id = user_id, vehicle = item, tax = os.time(), plate = vRP.generatePlateNumber() })
            end 
        },

        [20] = { -- DIA
            item = 'cocaina', -- SPAWN DO ITEM
            itemName = 'cocaina', -- NOME DO ITEM
            amount = 20, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [22] = { -- DIA
            item = 'GADGET_PARACHUTE', -- SPAWN DO ITEM
            itemName = 'GADGET_PARACHUTE', -- NOME DO ITEM
            amount = 3, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [23] = { -- DIA
            item = 'dinheirosujo', -- SPAWN DO ITEM
            itemName = 'Dinheiro Sujo', -- NOME DO ITEM
            amount = 100000, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [24] = { -- DIA
            item = 'AMMO_MACHINEPISTOL', -- SPAWN DO ITEM
            itemName = 'AMMO_MACHINEPISTOL', -- NOME DO ITEM
            amount = 100, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [25] = { -- DIA
            item = 'WEAPON_MACHINEPISTOL', -- SPAWN DO ITEM
            itemName = 'WEAPON_MACHINEPISTOL', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [26] = { -- DIA
            item = 'heroina', -- SPAWN DO ITEM
            itemName = 'heroina', -- NOME DO ITEM
            amount = 50, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [27] = { -- DIA
            item = 'cirurgia', -- SPAWN DO ITEM
            itemName = 'cirurgia', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [28] = { -- DIA
            item = 'WEAPON_KNIFE', -- SPAWN DO ITEM
            itemName = 'WEAPON_KNIFE', -- NOME DO ITEM
            amount = 1, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [29] = { -- DIA
            item = 'WEAPON_SPECIALCARBINE_MK2', -- SPAWN DO ITEM
            itemName = 'WEAPON_SPECIALCARBINE_MK2', -- NOME DO ITEM
            amount = 2, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },

        [30] = { -- DIA
            item = 'AMMO_SPECIALCARBINE_MK2', -- SPAWN DO ITEM
            itemName = 'AMMO_SPECIALCARBINE_MK2', -- NOME DO ITEM
            amount = 100, -- QUANTIDADE
            type = 'item', -- ITEM / CAR / OTHERS 
            func = function(source,user_id, item, amount) 
                vRP.giveInventoryItem(user_id, item, amount, true)
            end 
        },
    },
}