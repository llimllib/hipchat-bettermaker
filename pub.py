from pub import task
from pub.shortcuts import rm, zip

@task
def package():
    zip("hipchat_bettermaker.zip *")

@task
def clean():
    rm("hipchat_bettermaker.zip")
