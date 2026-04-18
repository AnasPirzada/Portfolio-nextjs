import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GitHubContributions = ({ username = 'AnasPirzada' }) => {
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub contribution graph
    // Note: GitHub API requires authentication for detailed stats
    // This is a placeholder - you can integrate with GitHub API or use a service
    const fetchContributions = async () => {
      try {
        // Using GitHub's contribution graph image as fallback
        // For full API integration, you'd need to use GitHub API with authentication
        setContributions({
          total: 620,
          streak: 15,
          graphUrl: `https://ghchart.rshah.org/${username}`,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-dark"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-br from-accent-light/5 to-accent-dark/5 rounded-2xl p-6 border border-accent-light/20 hover:border-accent-light/40 transition-all"
    >
      <h3 className="text-2xl font-bold text-gray-dark-1 dark:text-white mb-4 flex items-center gap-2">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
        Contribution Graph
      </h3>

      {contributions && (
        <>
          <div className="mb-4 flex gap-4 text-sm">
            <div className="text-gray-dark-3 dark:text-gray-light-2">
              <span className="text-accent-dark font-semibold">
                {contributions.total}
              </span>{' '}
              contributions in the last year
            </div>
          </div>
          {contributions.streak && (
            <div className="flex items-center gap-2 text-sm mt-2">
              <div className="text-gray-dark-3 dark:text-gray-light-2">
                <span className="text-accent-dark font-semibold">
                  {contributions.streak}
                </span>{' '}
                day streak
              </div>
            </div>
          )}

          <div className="w-full overflow-x-auto">
            <img
              src={contributions.graphUrl}
              alt="GitHub contribution graph"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-accent-dark hover:text-accent-light transition-colors text-sm"
          >
            View full profile
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </>
      )}
    </motion.div>
  );
};

export default GitHubContributions;
