# ~~Aliases~~

alias md=mkdir
alias ll="ls -la"
alias h=history
alias rgf="rg --files | rg"
alias psf="ps -fade"

# Git-specific (purposely not git aliases)
alias gits="git status"
function gf() {
  git fetch origin ${1:-master}
}
alias regit="gf && git reset --hard FETCH_HEAD"
alias rebase="gf && git rebase FETCH_HEAD"
alias gitam="git commit --amend --no-edit"
alias gitpr="gh pr create -f -l "Merge When Ready" -l "Ready For Review"
alias gst="git stash push -m ""
alias gpop="git stash pop"
# Rewind last commit
alias grw="git reset HEAD^"
# Show previously checked out branches
alias gitb="git branch --sort -committerdate --format '%(align:50,left)%(refname:short)%(end) %(color:green)%(HEAD) %(color:reset)%(color:red)%(objectname:short)%(color:reset) %(align:15,left)%(committerdate:relative)%(end) %(color:blue)%(upstream:remoteref)%(color:reset) %(upstream:track)'"