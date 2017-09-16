if defined?(Pry)
  Pry.commands.alias_command 'dp', 'disable-pry'

  # Because I'm an idiot
  Pry.commands.alias_command 'fg', 'edit'

  Pry::Commands.create_command 'np' do
    description "Disable the pager"

    def process
      _pry_.config.pager = nil
    end
  end

  Pry::Commands.create_command 'ras' do
    description "Require ActiveSupport"

    def process
      require 'active_support/all'
    end
  end
end
