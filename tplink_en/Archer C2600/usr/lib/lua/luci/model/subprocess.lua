module("luci.model.subprocess", package.seeall)

function call(command)
    local pid = nixio.fork()
    if pid == 0 then
       -- patch stdin, out, err to /dev/null
       local null = nixio.open("/dev/null", "w+")
       if null then
           nixio.dup(null, nixio.stderr)
           nixio.dup(null, nixio.stdout)
           nixio.dup(null, nixio.stdin)
           if null:fileno() > 2 then
               null:close()
           end
        end

        -- replace with target command
        return nixio.execp(unpack(command))
    elseif pid > 0 then
        local _, stat, code = nixio.waitpid(pid)
        if stat == "exited" then
            return code
        else
            return nil
        end
    end
end
