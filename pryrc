if defined?(Pry)
  Pry.commands.alias_command 'dp', 'disable-pry'

  # Because I'm an idiot
  Pry.commands.alias_command 'fg', 'edit'
end
