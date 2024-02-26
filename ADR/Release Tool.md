# Architecture Decision Record

## Release Tool

The process to generate a new release is tedious, and we would like to have a clear, easy
process to generate a new version.

There are several tools existing for this purpose with their own specificities

### Key Performance Indicators

- It is possible to publish a new release with a single command
- The tool is non-invasive: no configuration file in the project codebase

### Candidates

- [semantic-release](https://semantic-release.gitbook.io/semantic-release/)
- [release-it](https://github.com/release-it/release-it#readme)
- [np](https://github.com/sindresorhus/np#readme)
- [npmpub](https://github.com/MoOx/npmpub#readme)
- [bump](https://github.com/fabiospampinato/bump#readme)

### Matrix

|                  | simple                                                                  | non-invasive                  |
|------------------|-------------------------------------------------------------------------|-------------------------------|
| semantic-release | intended to be used in CI<br/>❌ requires env vars to authenticate       | imposes commit message format |
| release-it       | found no way to make is non-interactive<br/>requires clean working tree |                               |
| np               | ✅ `npx np minor`<br/>requires clean working tree (no unversioned file!) |                               |
| npmpub           | intended to be used in CI<br/>❌ requires env vars to authenticate       |                               |
| bump             | no dry-run mode                                                         |                               |

### Conclusion

The tool of choice for publication is **np**

I appreciate its short and straightforward command. It's totally non-invasive

The downside is that it does not stand unversioned file in the working tree.

However, the options may be reconsidered later when **bump** is more mature.

If there is actually a way to run **release-it** without prompt it may also be an alternative.

### References

https://cloudfour.com/thinks/how-to-publish-an-updated-version-of-an-npm-package/
