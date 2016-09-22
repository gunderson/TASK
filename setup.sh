#/bin/sh
# include local bash profile
source .bashrc

platform='unknown'
unamestr=`uname`
if [[ "$unamestr" == 'Linux' ]]; then
   platform='linux'
elif [[ "$unamestr" == 'Darwin' ]]; then
   platform='darwin'
fi


# install dependencies for OS X
if [[ $platform == 'darwin' ]]; then
	# install homebrew if necessary
	if !([ -a /usr/local/bin/brew ]); then
		/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	fi

	#install system dependencies
	brew update
	cat .homebrew-packages | brew install

# install dependencies for Ubuntu/Debian
elif [[ $platform == 'linux' ]]; then

	#install system dependencies
	sudo apt-get update
	cat .apt-packages | sudo apt-get install
fi


# configure git
git config --global alias.add-commit '!git add -A && git commit'

#install atom dependencies
apm update
cat .atom-packages | apm install

#install node dependencies
npm update
npm install
