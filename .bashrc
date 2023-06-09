# Bind inputrc for all input modifications
bind -f ~/.inputrc

export PATH="$HOME/bin:$PATH"

# ~~Aliases~~
alias md=mkdir
alias ll="ls -la"
alias h=history
alias rgf="rg --files | rg"
alias psf="ps -fade"
# ~~Aliases end~~

# ~~git-specific (purposely not git aliases)~~
alias gits="git status"
function gf() {
  default_branch=$(git rev-parse --abbrev-ref origin/HEAD | cut -c8-)
  git fetch origin ${1:-$default_branch}
}
alias regit="git reset --hard FETCH_HEAD"
alias rebase="git rebase FETCH_HEAD"
alias gitam="git commit --amend --no-edit"
alias gitpr="gh pr create -f"
alias gst="git stash push -m"
alias gpop="git stash pop"
alias gitlg="git log --graph --pretty=format:'%Cred%h%Creset %<(15,trunc)%an %s - %Creset %C(yellow)%d%Creset %Cgreen(%cr)%Creset' --abbrev-commit --date=relative"
# Rewind last commit
alias grw="git reset HEAD^"
# Show previously checked out branches
alias gitb="git branch --sort -committerdate --format '%(align:50,left)%(refname:short)%(end) %(color:green)%(HEAD) %(color:reset)%(color:red)%(objectname:short)%(color:reset) %(align:15,left)%(committerdate:relative)%(end) %(color:blue)%(upstream:remoteref)%(color:reset) %(upstream:track)'"
# ~~Git end~~

# ~~JS env things~~
export PNPM_HOME="$HOME/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
export BUN_INSTALL="$HOME/.bun"
export PATH=$BUN_INSTALL/bin:$PATH
# ~~end JS env things~~

source ~/.bashrc_work
