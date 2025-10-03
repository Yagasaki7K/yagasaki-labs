-- PREPARE AS QUERIES DO BANCO DE DADOS vRP
vRP.prepare("daily/get_progress", "SELECT progress FROM vrp_daily WHERE user_id = @user_id")
vRP.prepare("daily/save_progress", "REPLACE INTO vrp_daily(user_id, progress) VALUES(@user_id, @progress)")
local json = require "json"
local saveFile = "data_daily.json"

function saveUserDaily()
	local file = io.open(saveFile, "w+")
	if file then
		file:write(json.encode(userDaily))
		file:close()
	end
end

function loadUserDaily()
	local file = io.open(saveFile, "r")
	if file then
		local content = file:read("*a")
		file:close()
		if content and content ~= "" then
			local ok, data = pcall(json.decode, content)
			if ok and type(data) == "table" then
				userDaily = data
			end
		end
	end
end

loadUserDaily()

RegisterNetEvent('daily:redeemReward')
AddEventHandler('daily:redeemReward', function(day)
	local src = source
	local user_id = vRP.getUserId(src)
	if not user_id then return end
	if not canClaim(user_id, day) then
		TriggerClientEvent('Notify', src, 'negado', 'Você já resgatou ou não pode resgatar esta recompensa!')
		return
	end
	local reward = Config.dailyRewards[day]
	if reward then
		reward.func(src, user_id, reward.item, reward.amount)
		setClaimed(user_id, day)
		-- Salva o timestamp do último resgate
		local daily = getUserDaily(user_id)
		daily.lastClaim = os.time()
		TriggerClientEvent('Notify', src, 'sucesso', 'Recompensa resgatada: '..reward.itemName)
	else
		TriggerClientEvent('Notify', src, 'negado', 'Recompensa inválida!')
	end
end)



RegisterCommand('daily', function(source, args, rawCommand)
	local player = source
	if player > 0 then
		TriggerClientEvent('daily:openDaily', player)
	end
end, false)
local userDaily = {}

function getUserDaily(user_id)
	if not userDaily[user_id] then
		local rows = vRP.query("daily/get_progress", { user_id = user_id })
		if rows and #rows > 0 then
			local data = json.decode(rows[1].progress)
			userDaily[user_id] = data
		else
			userDaily[user_id] = { currentDay = 1, claimed = {} }
		end
	end
	return userDaily[user_id]
end

function saveUserDaily(user_id)
	local daily = userDaily[user_id]
	if daily then
		local progress = json.encode(daily)
		vRP.execute("daily/save_progress", { user_id = user_id, progress = progress })
	end
end

function canClaim(user_id, day)
	local daily = getUserDaily(user_id)
	if day ~= daily.currentDay or daily.claimed[day] then return false end
	if daily.lastClaim then
		local seconds = os.time() - daily.lastClaim
		if seconds < 86400 then return false end
	end
	return true
end

function setClaimed(user_id, day)
	local daily = getUserDaily(user_id)
	daily.claimed[day] = true
	if daily.currentDay < #Config.dailyRewards then
		daily.currentDay = daily.currentDay + 1
	end
	daily.lastClaim = os.time()
	saveUserDaily(user_id)
end
-- Adicione estas queries ao seu banco de dados vRP
-- CREATE TABLE IF NOT EXISTS vrp_daily (user_id INTEGER PRIMARY KEY, progress TEXT);
-- vRP.prepare("daily/get_progress", "SELECT progress FROM vrp_daily WHERE user_id = @user_id")
-- vRP.prepare("daily/save_progress", "REPLACE INTO vrp_daily(user_id, progress) VALUES(@user_id, @progress)")


RegisterNetEvent('daily:getRewards')
AddEventHandler('daily:getRewards', function()
	local src = source

	local user_id = vRP.getUserId(src)
	local daily = user_id and getUserDaily(user_id) or { currentDay = 1, claimed = {} }
	local rewards = {}
	local totalDays = 0
	for k,v in pairs(Config.dailyRewards) do totalDays = totalDays + 1 end
	for k,v in pairs(Config.dailyRewards) do
		table.insert(rewards, {
			day = k,
			item = v.item,
			image = v.item, -- campo para o ícone
			itemName = v.itemName,
			amount = v.amount,
			type = v.type,
			blocked = daily.claimed[k] or false,
			redeemed = daily.claimed[k] or false,
			progress = (daily.currentDay == k and 100 or 0)
		})
	end
	local remainingDays = totalDays - daily.currentDay
	local remainingTime = 0
	if daily.lastClaim then
		local seconds = 86400 - (os.time() - daily.lastClaim)
		remainingTime = math.max(seconds, 0)
	end
	TriggerClientEvent('daily:receiveRewards', src, {
		store = "https://www.google.com",
		currentDay = daily.currentDay,
		remainingTime = remainingTime,
		remainingDays = remainingDays,
		items = rewards
	})
end)

