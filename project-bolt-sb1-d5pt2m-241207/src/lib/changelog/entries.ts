import { changelogTracker } from './index';

// Add recent changes
changelogTracker.addEntry({
  userRequest: "Add a button on the right of the Title of the Changelog page title: 'Show Bolt Changelog'",
  changes: [
    {
      type: 'added',
      items: [
        'Added Bolt Changelog button to Changelog page',
        'Created BoltChangelog component',
        'Implemented changelog tracking system'
      ]
    }
  ]
});

changelogTracker.addEntry({
  userRequest: "Update Changelog to be numbered currently at 0.8.13 which includes the recent updates in Bolt",
  changes: [
    {
      type: 'changed',
      items: [
        'Updated version numbering system',
        'Reorganized changelog structure',
        'Added version history tracking'
      ]
    }
  ]
});

changelogTracker.addEntry({
  userRequest: "Add link at the bottom of the Changelog that links: 'Show Roadmap'",
  changes: [
    {
      type: 'added',
      items: [
        'Added Roadmap link to Changelog page',
        'Created comprehensive Roadmap page',
        'Implemented feature voting system',
        'Added feature suggestion functionality'
      ]
    }
  ]
});

changelogTracker.addEntry({
  userRequest: "On the Upgrade Page, update the H1 Title size and location",
  changes: [
    {
      type: 'changed',
      items: [
        'Updated Upgrade page header styling',
        'Realigned monthly/yearly toggle',
        'Modified Prime plan description'
      ]
    }
  ]
});

changelogTracker.addEntry({
  userRequest: "Fix Layout component export issues",
  changes: [
    {
      type: 'fixed',
      items: [
        'Resolved Layout component export error',
        'Fixed ErrorBoundary component integration',
        'Updated component import structure'
      ]
    }
  ]
});

changelogTracker.addEntry({
  userRequest: "Create a Media Library template for use in all 4 Asset Type Pages",
  changes: [
    {
      type: 'added',
      items: [
        'Created unified Media Library component',
        'Implemented asset type filtering',
        'Added AI/User content toggle',
        'Integrated file upload functionality'
      ]
    },
    {
      type: 'changed',
      items: [
        'Standardized media handling across asset types',
        'Improved media preview functionality'
      ]
    }
  ]
});

changelogTracker.addEntry({
  userRequest: "Create a new page under Journey called 'Windows'",
  changes: [
    {
      type: 'added',
      items: [
        'Created Windows page for routine building',
        'Implemented time quadrant system',
        'Added practice management functionality',
        'Created nested time window selection'
      ]
    }
  ]
});