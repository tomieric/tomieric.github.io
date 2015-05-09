## Chill

Chill 是 Airpub 的默认主题，也是首个主题。

如果你打算修改 Airpub 的现有主题，这份文档会有一些帮助。

### 了解 Airpub 的主题机制

Airpub 核心代码仅提供 angular app 与主模板文件。这些 js 代码的设计思路是尽量与页面的表现分离，并且能够尽可能多的为主题设计师提供需要的模板数据。

同时，Airpub 的主题基于 bower 进行包管理。主题开发者可以通过简单的方式将自己的主题发布到 bower：

1. fork Chill
2. 修改主模板文件（`index.html`）的引用地址，确保正确引用了本地的主题
3. 开始修改主题，并相应的的修改 `bower.json` 与 `package.json`
4. 修改好主题，确认并注册到 bower (`bower register myTheme <myThemeGitUri>`)

### 为什么这样做？

使用 bower 能更好的分离样式内容与逻辑代码。因此，我推荐你使用 bower 管理并发布你自己的主题。

如果你不想使用 bower 或者有临时的修改需要，也可以直接放置再本地的 Airpub 项目中，仅需要修改 `airpubConfig` 中相应的配置，并修改主模板文件（`index.html`）中的样式引用即可。
