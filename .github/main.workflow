workflow "build and publish" {
  on = "push"
  resolves = ["send to tarballs.snoot.club"]
}

action "master only" {
  uses = "actions/bin/filter@24a566c2524e05ebedadef0a285f72dc9b631411"
  args = "branch master"
}

action "install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
  needs = ["master only"]
}

action "build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "build"
  needs = "install"
}

action "create a tarball" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["build"]
  args = "pack"
}

action "send to tarballs.snoot.club" {
  uses = "swinton/httpie.action@8ab0a0e926d091e0444fcacd5eb679d2e2d4ab3d"
  needs = ["create a tarball"]
  args = "--form POST tarballs.snoot.club pathword=$tarballs_pathword ball@chee.snoot.club-0.0.0.tgz"
  secrets = ["tarballs_pathword"]
}
