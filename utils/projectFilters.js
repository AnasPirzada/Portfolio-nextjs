/**
 * Project filtering and search utility
 */

/**
 * Filter projects based on search term and tags
 * @param {Array} projects - Array of project objects
 * @param {string} searchTerm - Search term to filter by name/description
 * @param {Array} selectedTags - Array of selected technology tags
 * @returns {Array} Filtered projects array
 */
export const filterProjects = (
  projects,
  searchTerm = '',
  selectedTags = []
) => {
  return projects.filter(project => {
    // Search term filter
    const matchesSearch =
      searchTerm === '' ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Tags filter
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some(tag => project.tech.includes(tag));

    return matchesSearch && matchesTags;
  });
};

/**
 * Extract unique tags from projects
 * @param {Array} projects - Array of project objects
 * @returns {Array} Unique technology tags
 */
export const getUniqueTags = projects => {
  const tags = new Set();
  projects.forEach(project => {
    project.tech.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

/**
 * Sort projects by date
 * @param {Array} projects - Array of project objects
 * @param {string} order - 'asc' for ascending, 'desc' for descending
 * @returns {Array} Sorted projects array
 */
export const sortProjectsByDate = (projects, order = 'desc') => {
  const sorted = [...projects].sort((a, b) => {
    const dateA = parseInt(a.year);
    const dateB = parseInt(b.year);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
  return sorted;
};

/**
 * Group projects by category
 * @param {Array} projects - Array of project objects
 * @returns {Object} Projects grouped by category
 */
export const groupProjectsByCategory = projects => {
  return projects.reduce((grouped, project) => {
    const category = project.category || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(project);
    return grouped;
  }, {});
};
