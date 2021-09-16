module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        dmg: {
          contents: [{
              x: 130,
              y: 220
            },
            {
              x: 410,
              y: 220,
              type: "link",
              path: "/Applications"
            }
          ]
        },
        win: {
          "icon": "public/ic_app.png",
          "target": [ // 빌드 옵션 : 32bit, 64bit 지원을 위해 추가합니다.
            {
              "target": "portable",
              "arch": [
                "x64",
                "ia32"
              ]
            }
          ]
        }
      }
    }
  }
}