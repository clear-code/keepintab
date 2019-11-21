.PHONY: xpi format

all: xpi

xpi: update_extlib install_extlib
	rm -f ./*.xpi
	zip -r -0 keepintab.xpi manifest.json keepintab.js background.js extlib LICENSE.txt -x '*/.*' >/dev/null 2>/dev/null

update_extlib:
	git submodule update --init

install_extlib:
	cp submodules/webextensions-lib-configs/Configs.js extlib/

