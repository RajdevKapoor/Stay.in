// @ts-check
describe('todos API', () => {
    /**
     * @typedef {Object} Todo
     * @property {number} id
     * @property {string} task
     */
  
    /** @type {Todo[]} */
    const initialItems = [
      {
        'id': 1,
        'task': 'read something',
      },
      {
        'id': 2,
        'task': 'write something',
      },
    ]
  
    const getItems = () => {
      return cy.request('/todos')
      .its('body')
    }
  
    /** @type {(todo:Todo) => Cypress.Chainable} */
    const add = (item) => {
      return cy.request('POST', '/todos', item)
    }
  
    const deleteItem = (item) => {
      return cy.request('DELETE', `/todos/${item.id}`)
    }
  
    const deleteAll = () => {
      return getItems()
      .each(deleteItem)
    }
  
    const reset = () => {
      deleteAll()
      initialItems.forEach(add)
    }
  
    beforeEach(reset)
    afterEach(reset)
  
    it('returns JSON', () => {
      cy.request('/todos')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
    })
  
    it('loads 2 items', () => {
      cy.request('/todos')
      .its('body')
      .should('have.length', 2)
    })
  
    it('loads the initial items', () => {
      getItems()
      .should('deep.eq', initialItems)
    })
  
    it('returns id + task objects', () => {
      getItems()
      .each((value) => {
        return expect(value).to.have.all.keys('id', 'task')
      })
    })
  
    it('adds an item', () => {
      const randomId = Cypress._.random(0, 10000)
      const item = { id: randomId, task: 'life' }
  
      add(item)
      cy.request(`/todos/${randomId}`)
      .its('body')
      .should('deep.eq', item)
    })
  
    it('deletes an item', () => {
      const id = initialItems[0].id
  
      cy.request('DELETE', `/todos/${id}`)
      getItems()
      .should('have.length', 1)
    })
  })

  /* global chai */
/// <reference types="Cypress" />
/// <reference path="../support/index.d.ts" />

// we installed this node_module in package.json
// https://github.com/hurrymaplelad/chai-colors
import chaiColors from 'chai-colors'

// and we are extending chai to use this assertion
// plugin, but this plugin will only be available once
// this spec file runs.
//
// if we were running any other spec file
// it would not have access to this plugin
chai.use(chaiColors)

describe('Chai Assertion Plugins', function () {
  context('chai-date-string', function () {
    // we installed this node_module in package.json
    // https://github.com/googoid/chai-date-string
    //
    // the reason we can use this assertion plugin without
    // importing it in this file is that it's been globally
    // imported from our supportFile
    //
    // if look inside cypress/support/index.js
    // you'll see that we import cypress/support/assertions.js
    // and because the supportFile is bundled before our spec file,
    // it means we already have access to it
    it('can be used in any spec file', function () {
      expect('2015-11-12').to.be.a.dateString()
    })

    it('can be wrapped by Cypress as well', function () {
      cy.wrap('2016-03-14').should('be.a.dateString')
    })

    it('can be negated', function () {
      expect('2015-14-41').not.to.be.a.dateString()
    })

    it('can be negated using Cypress', function () {
      cy.wrap('2015-14-41').should('not.be.a.dateString')
    })
  })

  context('chai-colors', function () {
    it('can convert rgba to hex', function () {
      expect('rgba(0, 0, 0, 1)').to.be.colored('#000000')
    })

    it('can be wrapped by Cypress as well', function () {
      cy.wrap('rgba(0, 0, 0, 1)').should('be.colored', '#000000')
    })

    it('can be negated', function () {
      expect('#650042').not.to.be.colored('rgba(1, 2, 3, 4)')
    })

    it('can be negated using Cypress', function () {
      cy.wrap('#ff0000').should('not.be.colored', 'green')
    })
  })

  context('custom assertion', () => {
    it('checks if a given string is "foo" or not', () => {
      expect('foo').to.be.foo()
      expect('bar').to.not.be.foo()

      cy.wrap('foo').should('be.foo')
      cy.wrap('bar').should('not.be.foo')
    })
  })
})

/// <reference types="cypress" />

/* eslint-disable no-console */
describe('App error', () => {
  // NOTE: run this test to see it fail on application error
  it.skip('fails the Cypress test', () => {
    cy.visit('index.html')
    cy.get('button#error').click()
    // the error happens after 1000ms
    cy.wait(1500)
  })

  it('can be ignored', () => {
    /**
     * By using "cy.on()" we can ignore an exception in the current test only.
     * If you want to register exception handler for all tests using "Cypress.on()"
     * @see https://on.cypress.io/catalog-of-events
     * @param {Error} e The exception we caught
     * @param {Mocha.Runnable} runnable is the current test or hook during which the error is caught
     */
    cy.on('uncaught:exception', (e, runnable) => {
      console.log('error', e)
      console.log('runnable', runnable)

      // we can simply return false to avoid failing the test on uncaught error
      // return false
      // but a better strategy is to make sure the error is expected
      if (e.message.includes('Things went bad')) {
        // we expected this error, so let's ignore it
        // and let the test continue
        return false
      }
      // on any other error message the test fails
    })

    cy.visit('index.html')
    cy.get('button#error').click()
    // the error happens after 1000ms
    // we can use hard-coded wait, see the other test
    // to learn how to avoid an unnecessary wait
    cy.wait(1500)
  })

  // if the test finishes before the error is thrown -
  // the test is still passing!
  // NOTE: just a demo of the test that does not wait for an error
  it.skip('does not wait for the error', () => {
    cy.visit('index.html')
    cy.get('button#error').click()
    // the thrown error is "lost" because the test finishes
  })

  // we can avoid hard-coded waits in the test
  // by using Cypress retry-ability
  // https://on.cypress.io/retry-ability
  it('waits for the error', () => {
    // place any caught errors in this object
    const caught = {
      message: null,
    }

    cy.on('uncaught:exception', (e) => {
      caught.message = e.message

      // ignore the error
      return false
    })

    cy.visit('index.html')
    cy.get('button#error').click()

    // waits for the error and confirms the message
    cy.wrap(caught).should((c) => {
      expect(c.message).to.include('Things went bad')
    })
  })
})

/// <reference types="cypress" />
// import dayjs in a single spec that needs it
const dayjs = require('dayjs')

// in our example we parse UTC date, thus we need the UTC plugin
// https://day.js.org/docs/en/plugin/utc
const utc = require('dayjs/plugin/utc')
// we also need to know if a timestamp is between two other timestamps
// https://day.js.org/docs/en/query/is-between
const isBetween = require('dayjs/plugin/isBetween')
// we will parse a few time strings
// https://day.js.org/docs/en/plugin/custom-parse-format
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(utc)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)

describe('dayjs example', () => {
  it('has the current date', () => {
    cy.visit('index.html')
    const todaysDate = dayjs().format('MMM DD, YYYY')

    cy.contains('span', `Order shipped on: ${todaysDate}`)
  })

  it('parses UTC', () => {
    const time = dayjs.utc('2014-04-25T19:38:53.196Z').format('h:mm A')

    expect(time, 'formatted time').to.equal('7:38 PM')
  })

  it('has the posted time', () => {
    cy.visit('index.html')

    cy.get('.posted').contains('3:38 PM')
    .should('have.class', 'badge')

    // parse American time like "3:38 PM"
    const format = 'h:mm A'

    const start = dayjs('3:00 PM', format)
    const end = dayjs('5:00 PM', format)

    expect(start.isValid(), 'start date is valid').to.be.true
    expect(end.isValid(), 'end date is valid').to.be.true

    cy.get('.posted .badge')
    .should(($el) => {
      // the time in the element should be between 3pm and 5pm

      const posted = $el.text().trim()
      const m = dayjs(posted, format)

      expect(m.isValid(), 'posted date was parsed').to.be.true

      const message = `${posted} should be between ${start.format(format)} and ${end.format(format)}`

      expect(m.isBetween(start, end), message).to.be.true
    })
  })
})


/// <reference types="Cypress" />
describe('Browser notifications', () => {
  it('are supported by the test browser', () => {
    cy.visit('index.html')
    cy.window().should('have.property', 'Notification').should('be.a', 'function')
  })

  it('shows alert if the browser does not support notifications', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        delete win.Notification
      },
    })

    cy.on('window:alert', cy.stub().as('alerted'))
    cy.get('button').click()
    cy.get('@alerted').should('have.been.calledOnce')
    .and('have.been.calledWith', 'This browser does not support desktop notification')
  })

  it('creates Notification if was previously granted', () => {
    // see cy.visit options in https://on.cypress.io/visit
    cy.visit('index.html', {
      onBeforeLoad (win) {
        // https://on.cypress.io/stub
        cy.stub(win.Notification, 'permission', 'granted')
        cy.stub(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@Notification')
    .should('have.been.calledWithNew')
    .and('have.been.calledWithExactly', 'Permission was granted before')
  })

  it('asks for permission first, then shows notification if granted', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        cy.stub(win.Notification, 'permission', 'unknown')
        cy.stub(win.Notification, 'requestPermission').resolves('granted').as('ask')
        cy.stub(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@ask')
    .should('have.been.calledOnce')
    .and('have.been.calledBefore', cy.get('@Notification'))
  })

  it('asks for permission first, does nothing if denied', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        cy.stub(win.Notification, 'permission', 'unknown')
        cy.stub(win.Notification, 'requestPermission').resolves('denied').as('ask')
        cy.stub(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@ask').should('have.been.calledOnce')
    cy.get('@Notification').should('not.have.been.called')
  })

  it('does not show notification if permission was denied before', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        cy.stub(win.Notification, 'permission', 'denied')
        cy.stub(win.Notification, 'requestPermission').resolves('denied').as('ask')
        cy.stub(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@Notification').should('not.have.been.called')
  })

  it('spying on Notification', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        // the application checks if the permission was granted
        // using the property Notification.permission === 'granted'
        // which Sinon still supports, although it is marked deprecated
        cy.stub(win.Notification, 'permission', 'granted')
        cy.spy(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@Notification')
    .should('have.been.calledWithNew')
    .and('have.been.calledWithExactly', 'Permission was granted before')
  })

  it('spying on Notification via a workaround', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        // let's wrap Notification constructor
        // to make sure it is always called with "new" keyword
        const _Notification = win.Notification

        win.Notification = function MockNotification (text) {
          // use "new" when calling true Notification
          return new _Notification(text)
        }

        // and copy the rest of the important properties
        win.Notification.requestPermission = _Notification.requestPermission
        win.Notification.permission = 'granted'

        // now spy on the wrapped Notification method
        cy.spy(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@Notification')
    .should('have.been.calledWithNew')
    .and('have.been.calledWithExactly', 'Permission was granted before')
    .and('have.been.calledWithNew')
  })
})

// @ts-check
describe('todos API', () => {
  /**
   * @typedef {Object} Todo
   * @property {number} id
   * @property {string} task
   */

  /** @type {Todo[]} */
  const initialItems = [
    {
      'id': 1,
      'task': 'read something',
    },
    {
      'id': 2,
      'task': 'write something',
    },
  ]

  const getItems = () => {
    return cy.request('/todos')
    .its('body')
  }

  /** @type {(todo:Todo) => Cypress.Chainable} */
  const add = (item) => {
    return cy.request('POST', '/todos', item)
  }

  const deleteItem = (item) => {
    return cy.request('DELETE', `/todos/${item.id}`)
  }

  const deleteAll = () => {
    return getItems()
    .each(deleteItem)
  }

  const reset = () => {
    deleteAll()
    initialItems.forEach(add)
  }

  beforeEach(reset)
  afterEach(reset)

  it('returns JSON', () => {
    cy.request('/todos')
    .its('headers')
    .its('content-type')
    .should('include', 'application/json')
  })

  it('loads 2 items', () => {
    cy.request('/todos')
    .its('body')
    .should('have.length', 2)
  })

  it('loads the initial items', () => {
    getItems()
    .should('deep.eq', initialItems)
  })

  it('returns id + task objects', () => {
    getItems()
    .each((value) => {
      return expect(value).to.have.all.keys('id', 'task')
    })
  })

  it('adds an item', () => {
    const randomId = Cypress._.random(0, 10000)
    const item = { id: randomId, task: 'life' }

    add(item)
    cy.request(`/todos/${randomId}`)
    .its('body')
    .should('deep.eq', item)
  })

  it('deletes an item', () => {
    const id = initialItems[0].id

    cy.request('DELETE', `/todos/${id}`)
    getItems()
    .should('have.length', 1)
  })
})


/// <reference types="Cypress" />
describe('Browser notifications', () => {
  it('are supported by the test browser', () => {
    cy.visit('index.html')
    cy.window().should('have.property', 'Notification').should('be.a', 'function')
  })

  it('shows alert if the browser does not support notifications', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        delete win.Notification
      },
    })

    cy.on('window:alert', cy.stub().as('alerted'))
    cy.get('button').click()
    cy.get('@alerted').should('have.been.calledOnce')
    .and('have.been.calledWith', 'This browser does not support desktop notification')
  })

  it('creates Notification if was previously granted', () => {
    // see cy.visit options in https://on.cypress.io/visit
    cy.visit('index.html', {
      onBeforeLoad (win) {
        // https://on.cypress.io/stub
        cy.stub(win.Notification, 'permission', 'granted')
        cy.stub(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@Notification')
    .should('have.been.calledWithNew')
    .and('have.been.calledWithExactly', 'Permission was granted before')
  })

  it('asks for permission first, then shows notification if granted', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        cy.stub(win.Notification, 'permission', 'unknown')
        cy.stub(win.Notification, 'requestPermission').resolves('granted').as('ask')
        cy.stub(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@ask')
    .should('have.been.calledOnce')
    .and('have.been.calledBefore', cy.get('@Notification'))
  })

  it('asks for permission first, does nothing if denied', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        cy.stub(win.Notification, 'permission', 'unknown')
        cy.stub(win.Notification, 'requestPermission').resolves('denied').as('ask')
        cy.stub(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@ask').should('have.been.calledOnce')
    cy.get('@Notification').should('not.have.been.called')
  })

  it('does not show notification if permission was denied before', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        cy.stub(win.Notification, 'permission', 'denied')
        cy.stub(win.Notification, 'requestPermission').resolves('denied').as('ask')
        cy.stub(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@Notification').should('not.have.been.called')
  })

  it('spying on Notification', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        // the application checks if the permission was granted
        // using the property Notification.permission === 'granted'
        // which Sinon still supports, although it is marked deprecated
        cy.stub(win.Notification, 'permission', 'granted')
        cy.spy(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@Notification')
    .should('have.been.calledWithNew')
    .and('have.been.calledWithExactly', 'Permission was granted before')
  })

  it('spying on Notification via a workaround', () => {
    cy.visit('index.html', {
      onBeforeLoad (win) {
        // let's wrap Notification constructor
        // to make sure it is always called with "new" keyword
        const _Notification = win.Notification

        win.Notification = function MockNotification (text) {
          // use "new" when calling true Notification
          return new _Notification(text)
        }

        // and copy the rest of the important properties
        win.Notification.requestPermission = _Notification.requestPermission
        win.Notification.permission = 'granted'

        // now spy on the wrapped Notification method
        cy.spy(win, 'Notification').as('Notification')
      },
    })

    cy.get('button').click()
    cy.get('@Notification')
    .should('have.been.calledWithNew')
    .and('have.been.calledWithExactly', 'Permission was granted before')
    .and('have.been.calledWithNew')
  })
})


/// <reference types="cypress" />

/* eslint-disable no-console */
describe('App error', () => {
  // NOTE: run this test to see it fail on application error
  it.skip('fails the Cypress test', () => {
    cy.visit('index.html')
    cy.get('button#error').click()
    // the error happens after 1000ms
    cy.wait(1500)
  })

  it('can be ignored', () => {
    /**
     * By using "cy.on()" we can ignore an exception in the current test only.
     * If you want to register exception handler for all tests using "Cypress.on()"
     * @see https://on.cypress.io/catalog-of-events
     * @param {Error} e The exception we caught
     * @param {Mocha.Runnable} runnable is the current test or hook during which the error is caught
     */
    cy.on('uncaught:exception', (e, runnable) => {
      console.log('error', e)
      console.log('runnable', runnable)

      // we can simply return false to avoid failing the test on uncaught error
      // return false
      // but a better strategy is to make sure the error is expected
      if (e.message.includes('Things went bad')) {
        // we expected this error, so let's ignore it
        // and let the test continue
        return false
      }
      // on any other error message the test fails
    })

    cy.visit('index.html')
    cy.get('button#error').click()
    // the error happens after 1000ms
    // we can use hard-coded wait, see the other test
    // to learn how to avoid an unnecessary wait
    cy.wait(1500)
  })

  // if the test finishes before the error is thrown -
  // the test is still passing!
  // NOTE: just a demo of the test that does not wait for an error
  it.skip('does not wait for the error', () => {
    cy.visit('index.html')
    cy.get('button#error').click()
    // the thrown error is "lost" because the test finishes
  })

  // we can avoid hard-coded waits in the test
  // by using Cypress retry-ability
  // https://on.cypress.io/retry-ability
  it('waits for the error', () => {
    // place any caught errors in this object
    const caught = {
      message: null,
    }

    cy.on('uncaught:exception', (e) => {
      caught.message = e.message

      // ignore the error
      return false
    })

    cy.visit('index.html')
    cy.get('button#error').click()

    // waits for the error and confirms the message
    cy.wrap(caught).should((c) => {
      expect(c.message).to.include('Things went bad')
    })
  })
})

/// <reference types="cypress" />

/* eslint-disable no-console */
describe('Unhandled promises', () => {
  // NOTE: this test fails in Cypress 7.0+
  it.skip('fail the Cypress test', () => {
    cy.visit('index.html')
    cy.get('button#promise').click()
    // the unhandled promise happens after 1000ms
    cy.wait(1500)
  })

  it('handles the promise rejection', () => {
    // place any caught errors in this object
    const caught = {
      message: null,
    }

    cy.on('uncaught:exception', (e, runnable, promise) => {
      caught.message = e.message

      return false
    })

    cy.visit('index.html')

    cy.get('button#promise').click()
    // waits for the error and confirms the message
    cy.wrap(caught).should((c) => {
      expect(c.message).to.include('Did not handle this promise')
    })
  })
})


/// <reference types="cypress" />

/* eslint-env browser */
/* eslint-disable no-console */
describe('Unhandled promises in the test code', () => {
  // NOTE: this test will pass in Cypress < 7.0 and fail in Cypress 7.0+
  it.skip('does not affect the Cypress test', () => {
    Cypress.Promise.delay(1000).then(() => {
      throw new Error('Test code has a rejected promise')
    })

    cy.visit('index.html')
    // because the promise will be rejected after one second
    // wait inside the test
    cy.wait(1100)
  })

  // NOTE: the test fails because we catch the unhandled promise rejection
  it.skip('fails test on unhandled rejection in the test code that uses Cypress.Promise', () => {
    // Cypress promises are Bluebird promises
    // https://on.cypress.io/promise
    // and have a callback for unhandled rejections
    // it will catch any rejected promises created using Cypress.Promise
    Cypress.Promise.onPossiblyUnhandledRejection((error, promise) => {
      throw error
    })

    Cypress.Promise.delay(1000).then(() => {
      throw new Error('Test code has a rejected promise')
    })

    cy.visit('index.html')
    // because the promise will be rejected after one second
    // wait inside the test
    cy.wait(1100)
  })

  // NOTE: the test fails because we catch the unhandled promise rejection
  it.skip('fails test on unhandled rejection in the test code that uses built-in Promise', () => {
    // note: since we are registering this event listener
    // on the spec's window and not on the application's window
    // Cypress does NOT reset it after every test
    window.addEventListener('unhandledrejection', (event) => {
      throw event.reason
    })

    // use the built-in browser promises,
    // reject it after one second
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Rejected native promise'))
      }, 1000)
    })

    cy.visit('index.html')
    // because the promise will be rejected after one second
    // wait inside the test
    cy.wait(1100)
  })
})

/// <reference types="cypress" />
const allUsers = require('../fixtures/users.json')
// you can even require another JavaScript file
// and use whatever was exported there
const { names } = require('../fixtures/names')

// sanity check
expect(names, 'list of names').to.be.an('array')

describe('array fixture', () => {
  it('iterates over a list', () => {
    cy.fixture('users').then((users) => {
      expect(users).to.be.an('array').and.to.have.have.length(3)

      users.forEach((user) => {
        expect(user).to.have.keys(['name', 'age'])
        expect(user.age).to.be.a('number').and.be.gt(10).and.be.lt(100)
      })
    })
  })

  // we can dynamically create tests from a static JSON list
  // that we have loaded using "require" or "import" statement
  // for more examples, see "Dynamic tests" recipes
  allUsers.forEach((user) => {
    it(`has user ${user.name}`, () => {
      cy.wrap(user).should('have.property', 'name', user.name)
      cy.wrap(user).should('have.property', 'age', user.age)
    })
  })

  context('imported names', () => {
    // create a test for each name
    names.forEach((name) => {
      it(`"${name}" has first and last name`, () => {
        expect(name).to.match(/^\w+ \w+$/)
      })
    })
  })
})

/// <reference types="cypress" />
describe('Loading multiple fixtures', () => {
  context('before each test using closure variables', () => {
    let city
    let country

    beforeEach(() => {
      cy.fixture('city').then((c) => {
        city = c
      })

      cy.fixture('country').then((c) => {
        country = c
      })
    })

    it('has loaded fixtures', () => {
      expect({ city, country }).to.deep.equal({
        city: { name: 'Atlanta' },
        country: { name: 'United States' },
      })
    })

    it('still has fixtures in the second test', () => {
      expect({ city, country }).to.deep.equal({
        city: { name: 'Atlanta' },
        country: { name: 'United States' },
      })
    })
  })

  context('once before all tests', () => {
    let city
    let country

    before(() => {
      // load fixtures once before any tests
      // and they are kept in closure variables
      cy.fixture('city').then((c) => {
        city = c
      })

      cy.fixture('country').then((c) => {
        country = c
      })
    })

    it('has loaded fixtures', () => {
      expect({ city, country }).to.deep.equal({
        city: { name: 'Atlanta' },
        country: { name: 'United States' },
      })
    })

    it('still has loaded fixtures', () => {
      // we have loaded the fixtures and stored them
      // in the two variables and they should remain there
      expect({ city, country }).to.deep.equal({
        city: { name: 'Atlanta' },
        country: { name: 'United States' },
      })
    })
  })

  context('using Mocha context', () => {
    // notice how "beforeEach" callback uses "function"
    // form to make sure Mocha context points correctly at "this"
    beforeEach(function () {
      cy.fixture('city').then((c) => {
        this.city = c
      })

      cy.fixture('country').then((c) => {
        this.country = c
      })
    })

    it('has loaded fixtures', function () {
      // again, the test has to use "function" callback
      // to make sure "this" points at the Mocha context
      expect(this.city).to.deep.equal({ name: 'Atlanta' })
      expect(this.country).to.deep.equal({ name: 'United States' })
    })
  })

  context('using @ as shortcut to the Mocha context', () => {
    beforeEach(() => {
      // we can ask Cypress to save the loaded fixture
      // in the Mocha context using "cy.as" command
      // in this case, the callback can be "function" or "=>" expression
      cy.fixture('city').as('city')
      cy.fixture('country').as('country')
    })

    it('has loaded fixtures', function () {
      // again, the test has to use "function" callback
      // to make sure "this" points at the Mocha context
      expect(this.city).to.deep.equal({ name: 'Atlanta' })
      expect(this.country).to.deep.equal({ name: 'United States' })
    })
  })

  context('loading once and using @', () => {
    let city
    let country

    before(() => {
      // load fixtures just once, need to store in
      // closure variables because Mocha context is cleared
      // before each test
      cy.fixture('city').then((c) => {
        city = c
      })

      cy.fixture('country').then((c) => {
        country = c
      })
    })

    beforeEach(() => {
      // we can put data back into the empty Mocha context before each test
      // by the time this callback executes, "before" hook has finished
      cy.wrap(city).as('city')
      cy.wrap(country).as('country')
    })

    it('has loaded fixtures', function () {
      // again, the test has to use "function" callback
      // to make sure "this" points at the Mocha context
      expect(this.city).to.deep.equal({ name: 'Atlanta' })
      expect(this.country).to.deep.equal({ name: 'United States' })
    })
  })
})


