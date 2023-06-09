# Silence zsh warning
export BASH_SILENCE_DEPRECATION_WARNING=1

if [ ! -f ~/.git-completion.bash ]; then
  curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash
fi
source ~/.git-completion.bash

# ~~Make terminal show git branch~~

COLOR_LIGHT_GREEN="\[\033[1;32m\]"
COLOR_WHITE="\[\033[1;37m\]"
COLOR_LIGHT_GRAY="\[\033[0;37m\]"
COLOR_LIGHT_RED="\[\033[1;31m\]"
COLOR_LIGHT_YELLOW="\[\033[1;33m\]"

function parse_git_branch {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

PS1="$COLOR_WHITE\w$COLOR_LIGHT_RED\$(parse_git_branch) $COLOR_LIGHT_YELLOW\$ $COLOR_WHITE"

# ~~Completions and integrations~~

# ITerm2
# Requires running: curl -L https://iterm2.com/shell_integration/bash -o ~/.iterm2_shell_integration.bash
test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"

# ~~Reload bash configs on demand~~

source_from_file() {
  if [ -f $1 ]; then
    source $1
    echo "Updated from $1"
  fi
}
rebash () {
  for bashfile in ~/.bash_profile ~/.bashrc; do
      source_from_file $bashfile
  done
}

# Homebrew
eval "$(/opt/homebrew/bin/brew shellenv)"

source ~/.bashrc
