-- Adapted from https://github.com/meain/dotfiles/blob/master/mpv/.config/mpv/scripts/copy-ts.lua

require 'mp'

local function set_clipboard(text)
    mp.commandv("run", "bash", "-c", "echo "..text.."|pbcopy");
end

local function append_clipboard(text)
    mp.commandv("run", "bash", "-c", "echo `pbpaste` "..text.."|pbcopy");
end

local function get_time()
    local time_pos = mp.get_property_number("time-pos")
    local time_in_seconds = time_pos
    local time_seg = time_pos % 60
    time_pos = time_pos - time_seg

    local time_hours = math.floor(time_pos / 3600)
    time_pos = time_pos - (time_hours * 3600)

    local time_minutes = time_pos/60
    time_seg,time_ms=string.format("%.09f", time_seg):match"([^.]*).(.*)"

    -- time = string.format("%02d:%02d:%02d.%s", time_hours, time_minutes, time_seg, time_ms)
    time = string.format("%02d:%02d:%02d", time_hours, time_minutes, time_seg)

    return time
end

local function copyTime()
    local time = get_time()
    mp.osd_message(string.format("Copied to clipboard: %s", time))
    set_clipboard(time)
end

local function appendTime()
    local time = get_time()
    mp.osd_message(string.format("Appended to clipboard: %s", time))
    append_clipboard(time)
end

mp.add_key_binding(nil, "copyTime", copyTime)
mp.add_key_binding(nil, "appendTime", appendTime)
