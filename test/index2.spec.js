import { Listr } from 'listr2'
import makeConsoleMock from 'consolemock'
import path from 'path'

jest.mock('listr2')
jest.mock('../lib/resolveGitRepo')

// eslint-disable-next-line import/first
import lintStaged from '../lib/index'
import resolveGitRepo from '../lib/resolveGitRepo'

resolveGitRepo.mockImplementation(async () => ({ gitDir: 'foo', gitConfigDir: 'bar' }))

describe('lintStaged', () => {
  afterEach(() => {
    Listr.mockClear()
  })

  it('should pass quiet flag to Listr', async () => {
    expect.assertions(1)
    await lintStaged(
      { configPath: path.join(__dirname, '__mocks__', 'my-config.json'), quiet: true },
      makeConsoleMock()
    )
    expect(Listr.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "ctx": Object {
          "errors": Set {},
          "hasPartiallyStagedFiles": false,
          "shouldBackup": true,
        },
        "dateFormat": false,
        "exitOnError": false,
        "renderer": "silent",
      }
    `)
  })

  it('should pass debug flag to Listr', async () => {
    expect.assertions(1)
    await lintStaged(
      {
        configPath: path.join(__dirname, '__mocks__', 'my-config.json'),
        debug: true
      },
      makeConsoleMock()
    )
    expect(Listr.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "ctx": Object {
          "errors": Set {},
          "hasPartiallyStagedFiles": false,
          "shouldBackup": true,
        },
        "dateFormat": false,
        "exitOnError": false,
        "renderer": "verbose",
      }
    `)
  })
})
