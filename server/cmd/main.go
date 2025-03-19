package main

import (
	cards "github.com/Senechkaaa/engcards"
	"github.com/Senechkaaa/engcards/internal/handler"
	repository "github.com/Senechkaaa/engcards/internal/repository"
	"github.com/Senechkaaa/engcards/internal/service"
	"github.com/Senechkaaa/engcards/pkg/auth"
	"github.com/Senechkaaa/engcards/pkg/hash"
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"log"
)

//DROP TABLE IF EXISTS author CASCADE;
//DROP TABLE IF EXISTS book CASCADE;
//DROP TABLE IF EXISTS book_authors CASCADE;

func main() {

	if err := initConfig(); err != nil {
		logrus.Fatalf("err init config: %s", err)
	}

	//if err := godotenv.Load(); err != nil {
	//	logrus.Fatalf("err load env file: %s", err.Error())
	//}
	db, err := repository.NewPostgresDB(repository.Config{
		Host:     viper.GetString(`db.host`),
		Port:     viper.GetString(`db.port`),
		Username: viper.GetString(`db.username`),
		Password: viper.GetString(`db.password`),
		DBName:   viper.GetString(`db.dbname`),
		SSLMode:  viper.GetString(`db.sslmode`),
	})

	if err != nil {
		logrus.Fatalf("failed to initialize db: %s", err.Error())
	}
	manager, err := auth.NewManager(viper.GetString("signingKey"))

	if err != nil {
		logrus.Fatalf("failed to initialize manager: %s", err.Error())
		return
	}
	srv := new(cards.Server)
	repos := repository.NewRepository(db)
	hasher := hash.NewSHA1Hasher(viper.GetString(`hashSalt`))
	services := service.NewService(service.Deps{
		Repos:        repos,
		Hash:         hasher,
		TokenManager: manager,
	})
	handlers := handler.NewHandler(services)

	if err := srv.Run(viper.GetString("port"), handlers.InitRoutes(manager)); err != nil {
		log.Fatalf("err server: %s", err)
	}
}

func initConfig() error {
	viper.AddConfigPath("../configs")
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}
