import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 15px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f8ff'};
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin: 20px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const ProgressCard = styled.div`
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding: 25px;
  border-radius: 15px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3em;
  font-weight: bold;
  color: #667eea;
  margin: 10px 0;
`;

const PostForm = styled.form`
  background: #f8fafc;
  padding: 25px;
  border-radius: 15px;
  margin: 20px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  outline: none;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`;

const PostCard = styled.div`
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 15px;
  padding: 20px;
  margin: 15px 0;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
`;

const BlogParents = () => {
  const [activeTab, setActiveTab] = useState('progress');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: 'Parent Anonyme' });
  const [progressData, setProgressData] = useState({
    totalExercises: 45,
    completedExercises: 32,
    currentLevel: 4,
    streakDays: 7,
    timeSpent: 128,
    wordsLearned: 85
  });

  // Données factices pour les posts
  const initialPosts = [
    {
      id: 1,
      title: "Progrès incroyables avec la dictée magique !",
      content: "Ma fille Emma (8 ans) utilise l'application depuis 3 semaines et ses progrès sont remarquables. Elle adore le mode chant qui l'aide vraiment à retenir l'orthographe. Merci pour cet outil formidable !",
      author: "Marie L.",
      date: "Il y a 2 jours",
      likes: 12
    },
    {
      id: 2,
      title: "Conseils pour motiver nos enfants",
      content: "Bonjour à tous ! Je partage quelques astuces qui fonctionnent bien avec mon fils Lucas : utiliser un système de récompenses, faire des sessions courtes mais régulières, et surtout célébrer chaque petit progrès. Vos expériences ?",
      author: "Thomas M.",
      date: "Il y a 1 semaine",
      likes: 8
    },
    {
      id: 3,
      title: "L'importance de la patience",
      content: "Rappelons-nous que chaque enfant progresse à son rythme. Mon parcours avec ma fille m'a appris l'importance d'être patient et encourageant. Cette app nous aide énormément dans notre quotidien.",
      author: "Sophie R.",
      date: "Il y a 2 semaines",
      likes: 15
    }
  ];

  useEffect(() => {
    setPosts(initialPosts);
  }, []);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: posts.length + 1,
        ...newPost,
        date: "À l'instant",
        likes: 0
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', author: 'Parent Anonyme' });
    }
  };

  const likePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const renderProgressTab = () => (
    <div>
      <Card>
        <h2>📊 Tableau de Bord - Progrès de votre enfant</h2>
        
        <ProgressGrid>
          <ProgressCard>
            <h3>🎯 Exercices Complétés</h3>
            <StatNumber>{progressData.completedExercises}</StatNumber>
            <p>sur {progressData.totalExercises} exercices</p>
          </ProgressCard>
          
          <ProgressCard>
            <h3>🏆 Niveau Actuel</h3>
            <StatNumber>{progressData.currentLevel}</StatNumber>
            <p>Excellent progrès !</p>
          </ProgressCard>
          
          <ProgressCard>
            <h3>🔥 Série Quotidienne</h3>
            <StatNumber>{progressData.streakDays}</StatNumber>
            <p>jours consécutifs</p>
          </ProgressCard>
          
          <ProgressCard>
            <h3>⏰ Temps d'Apprentissage</h3>
            <StatNumber>{progressData.timeSpent}</StatNumber>
            <p>minutes cette semaine</p>
          </ProgressCard>
          
          <ProgressCard>
            <h3>📚 Mots Appris</h3>
            <StatNumber>{progressData.wordsLearned}</StatNumber>
            <p>nouveaux mots maîtrisés</p>
          </ProgressCard>
          
          <ProgressCard>
            <h3>📈 Évolution</h3>
            <StatNumber>+25%</StatNumber>
            <p>amélioration ce mois</p>
          </ProgressCard>
        </ProgressGrid>
      </Card>

      <Card>
        <h3>📈 Activité Récente</h3>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px' }}>
          <div style={{ marginBottom: '10px' }}>✅ Dictée magique - Mode sérieux (3 phrases correctes)</div>
          <div style={{ marginBottom: '10px' }}>🎵 Poésie musicale - Création d'un poème original</div>
          <div style={{ marginBottom: '10px' }}>🎮 Exercice lettres manquantes - 8/10 réussies</div>
          <div style={{ marginBottom: '10px' }}>🔤 Exercice syllabes - Niveau 3 terminé</div>
        </div>
      </Card>

      <Card>
        <h3>🎯 Objectifs de la Semaine</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{ background: '#e8f5e8', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #4caf50' }}>
            ✅ Compléter 5 exercices de dictée - Terminé !
          </div>
          <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #ffc107' }}>
            🎵 Créer 2 poèmes originaux - 1/2 terminé
          </div>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #6c757d' }}>
            🎮 Atteindre le niveau 5 - En cours (niveau 4)
          </div>
        </div>
      </Card>
    </div>
  );

  const renderCommunityTab = () => (
    <div>
      <Card>
        <h2>👥 Communauté des Parents</h2>
        <p>Partagez vos expériences, conseils et encouragements avec d'autres familles.</p>
        
        <PostForm onSubmit={handleSubmitPost}>
          <h3>✍️ Partager une expérience</h3>
          <Input
            type="text"
            placeholder="Titre de votre message..."
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
          />
          <Input
            type="text"
            placeholder="Votre nom (optionnel)"
            value={newPost.author}
            onChange={(e) => setNewPost({...newPost, author: e.target.value})}
          />
          <TextArea
            placeholder="Partagez votre expérience, vos conseils, vos questions..."
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
          />
          <Button type="submit">📝 Publier</Button>
        </PostForm>

        <h3>💬 Messages de la Communauté</h3>
        {posts.map(post => (
          <PostCard key={post.id}>
            <PostHeader>
              <AuthorInfo>
                <Avatar>{post.author.charAt(0)}</Avatar>
                <div>
                  <strong>{post.author}</strong>
                  <div style={{ fontSize: '0.9em', color: '#666' }}>{post.date}</div>
                </div>
              </AuthorInfo>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={() => likePost(post.id)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    fontSize: '1.1em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  ❤️ {post.likes}
                </button>
              </div>
            </PostHeader>
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>{post.title}</h4>
            <p style={{ lineHeight: '1.6' }}>{post.content}</p>
          </PostCard>
        ))}
      </Card>
    </div>
  );

  const renderResourcesTab = () => (
    <div>
      <Card>
        <h2>📚 Ressources pour Parents</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
          <div style={{ background: '#f0f8ff', padding: '20px', borderRadius: '15px' }}>
            <h3>🧠 Comprendre la Dyslexie</h3>
            <p>Guides et articles pour mieux comprendre les difficultés d'apprentissage et comment aider votre enfant.</p>
            <Button style={{ marginTop: '15px' }}>En savoir plus</Button>
          </div>
          
          <div style={{ background: '#f5f8f0', padding: '20px', borderRadius: '15px' }}>
            <h3>🎯 Stratégies d'Accompagnement</h3>
            <p>Techniques et méthodes pour soutenir l'apprentissage de votre enfant au quotidien.</p>
            <Button style={{ marginTop: '15px' }}>Découvrir</Button>
          </div>
          
          <div style={{ background: '#fff0f8', padding: '20px', borderRadius: '15px' }}>
            <h3>👨‍⚕️ Professionnels de Santé</h3>
            <p>Annuaire des orthophonistes et spécialistes recommandés dans votre région.</p>
            <Button style={{ marginTop: '15px' }}>Consulter</Button>
          </div>
        </div>

        <h3>💡 Conseils du Jour</h3>
        <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <p><strong>🌟 Astuce :</strong> Encouragez votre enfant à utiliser l'application à des moments où il est le plus réceptif, souvent après une pause ou un goûter. Les sessions courtes et régulières sont plus efficaces que les longues sessions.</p>
        </div>
      </Card>
    </div>
  );

  return (
    <Container>
      <h1 className="title">👨‍👩‍👧‍👦 Espace Parents</h1>
      <p className="subtitle">Suivez les progrès de votre enfant et connectez-vous avec d'autres familles</p>

      <TabContainer>
        <Tab 
          active={activeTab === 'progress'} 
          onClick={() => setActiveTab('progress')}
        >
          📊 Progrès
        </Tab>
        <Tab 
          active={activeTab === 'community'} 
          onClick={() => setActiveTab('community')}
        >
          👥 Communauté
        </Tab>
        <Tab 
          active={activeTab === 'resources'} 
          onClick={() => setActiveTab('resources')}
        >
          📚 Ressources
        </Tab>
      </TabContainer>

      {activeTab === 'progress' && renderProgressTab()}
      {activeTab === 'community' && renderCommunityTab()}
      {activeTab === 'resources' && renderResourcesTab()}
    </Container>
  );
};

export default BlogParents;