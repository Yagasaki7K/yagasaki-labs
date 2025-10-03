function API.openDaily()
    SetNuiFocus(true, true)
    SendNUIMessage({ action = "open" })
end

RegisterNuiCallback("getData", function(data, cb)
    cb(RESPONSE.getData())
end)



RegisterNuiCallback("redeem", function(data, cb)
    -- Envia para o servidor o dia que o jogador quer resgatar
    TriggerServerEvent("daily:redeemReward", data.day)
    SetNuiFocus(false, false)
    SendNUIMessage({ action = "close" })
    cb(true)
end)

RegisterNuiCallback("close", function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({ action = "close" })
    cb(true)
end)


RegisterNetEvent("daily:openDaily")
AddEventHandler("daily:openDaily", function()
    SetNuiFocus(true, true)
    SendNUIMessage({ action = "open" })
    TriggerServerEvent('daily:getRewards')
end)



RegisterNetEvent('daily:receiveRewards')
AddEventHandler('daily:receiveRewards', function(data)
    SendNUIMessage({
        action = "getData",
        store = data.store,
        currentDay = data.currentDay,
        remainingTime = data.remainingTime,
        remainingDays = data.remainingDays,
        items = data.items
    })
end)
