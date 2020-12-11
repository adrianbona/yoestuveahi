from django.core.management.base import BaseCommand, CommandError
from contagion.management.commands import process_contagion_risk
from core.models import User
from location.models import Location
from registry.models import Registry
from contagion.models import Contagion
from exam.models import Test
from django.utils import timezone
from datetime import timedelta
import random

NAMES = [
    ('Michael', 'Jennifer'),
    ('James', 'Lisa'),
    ('David', 'Kimberly'),
    ('John', 'Michelle'),
    ('Robert', 'Amy'),
    ('Christopher', 'Angela'),
    ('William', 'Melissa'),
    ('Brian', 'Tammy'),
    ('Mark', 'Mary'),
    ('Richard', 'Tracy'),
    ('Jeffrey', 'Julie'),
    ('Scott', 'Karen'),
    ('Jason', 'Laura'),
    ('Kevin', 'Christine'),
    ('Steven', 'Susan'),
    ('Joseph', 'Dawn'),
    ('Thomas', 'Stephanie'),
    ('Eric', 'Elizabeth'),
    ('Daniel', 'Heather'),
    ('Timothy', 'Kelly'),
    ('Charles', 'Tina'),
    ('Anthony', 'Shannon'),
    ('Paul', 'Lori'),
    ('Matthew', 'Patricia'),
    ('Kenneth', 'Cynthia'),
    ('Gregory', 'Pamela'),
    ('Stephen', 'Sandra'),
    ('Todd', 'Wendy'),
    ('Ronald', 'Rebecca'),
    ('Donald', 'Nicole'),
    ('Edward', 'Michele'),
    ('Andrew', 'Donna'),
    ('Patrick', 'Deborah'),
    ('Shawn', 'Teresa'),
    ('Gary', 'Christina'),
    ('Douglas', 'Denise'),
    ('Sean', 'Sharon'),
    ('Keith', 'Linda'),
    ('Craig', 'Maria'),
    ('George', 'Brenda'),
    ('Troy', 'Barbara'),
    ('Jonathan', 'Stacy'),
    ('Larry', 'Andrea'),
    ('Peter', 'Cheryl'),
    ('Jerry', 'Kathleen'),
    ('Dennis', 'Rhonda'),
    ('Bradley', 'Debra'),
    ('Frank', 'Stacey'),
    ('Raymond', 'Tonya'),
    ('Jeffery', 'Nancy'),
    ('Chad', 'Robin'),
    ('Aaron', 'Jill'),
    ('Bryan', 'Theresa'),
    ('Terry', 'Dana'),
    ('Rodney', 'Tracey'),
    ('Jose', 'Monica'),
    ('Tony', 'Paula'),
    ('Russell', 'Rachel'),
    ('Randy', 'Catherine'),
    ('Marc', 'Sherry'),
    ('Roger', 'Gina'),
    ('Samuel', 'Ann'),
    ('Chris', 'Kristin'),
    ('Shane', 'Leslie'),
    ('Johnny', 'Sarah'),
    ('Gerald', 'Jacqueline'),
    ('Carl', 'Katherine'),
    ('Jon', 'Renee'),
    ('Travis', 'Tara'),
    ('Jeremy', 'Diane'),
    ('Adam', 'Carol'),
    ('Marcus', 'Cindy'),
    ('Phillip', 'Carrie'),
    ('Brent', 'Holly'),
    ('Darren', 'Sheila'),
    ('Lance', 'Tanya'),
    ('Derek', 'Kathy'),
    ('Billy', 'Kim'),
    ('Vincent', 'Tamara'),
    ('Wayne', 'Margaret'),
    ('Benjamin', 'Heidi'),
    ('Joel', 'Kristen'),
    ('Lawrence', 'April'),
    ('Corey', 'Carolyn'),
    ('Danny', 'Victoria'),
    ('Jimmy', 'Regina'),
    ('Bobby', 'Suzanne'),
    ('Curtis', 'Laurie'),
    ('Walter', 'Diana'),
    ('Joe', 'Deanna'),
    ('Alan', 'Melanie'),
    ('Philip', 'Beth'),
    ('Martin', 'Melinda'),
    ('Bruce', 'Carla'),
    ('Juan', 'Jodi'),
    ('Derrick', 'Janet'),
    ('Jay', 'Valerie'),
    ('Carlos', 'Jessica'),
    ('Brett', 'Tiffany'),
    ('Randall', 'Traci'),
]

LOCATIONS = [
    ('-34.5688273', '-58.4663492', 253, 'Coto Monroe', 'https://lh5.googleusercontent.com/p/AF1QipNIk2zhUrFWZRHHxr_9-AFT2R4m66VBAY_dCL6c=w408-h408-k-no'),
    ('-34.5672813', '-58.4696429', 58, 'Coghlan Club Gym & Wellness', 'https://lh5.googleusercontent.com/p/AF1QipN0JGMQMxlVItNik_JnzCZKJyqB3uN7KglJ2MmY=s489-k-no'),
    ('-34.5718045', '-58.4783333', 39, 'Cervelar Villa Urquiza', 'https://lh5.googleusercontent.com/p/AF1QipOGWnRipSPkxxi0S_zp0F6hd_e9tVXk0EQdz9-R=w408-h306-k-no'),
    ('-34.5718045', '-58.4783333', 2, 'Occo Helados', 'https://lh5.googleusercontent.com/p/AF1QipN8p-WOOH0WFw17zpqIt4LpxjIRy7ifjk9biSzq=w203-h152-k-no'),
    ('-34.5741809', '-58.4792587', 8, 'Bodega Amparo', 'https://lh5.googleusercontent.com/p/AF1QipPU0zYAU3XtNvz2u-0q2qwE6EVqSmkqWMi0VdEm=s464-k-no'),
    ('-34.5744214', '-58.4824313', 15, 'McDonalds', 'https://lh5.googleusercontent.com/p/AF1QipOIcHgIBO0J-XO6ivZ4oJxpgfuTAIml2yjzf9JP=w408-h272-k-no'),
    ('-34.5726811', '-58.4850384', 39, 'La Rana', 'https://lh5.googleusercontent.com/p/AF1QipNbW1Kb5FegM7Xf1HiV0OajkY4iVeWn-49B_cKy=w408-h266-k-no'),
    ('-34.5725706', '-58.4884636', 60, 'Las Violetas', 'https://lh5.googleusercontent.com/p/AF1QipNbylkjD3qkFs74tWUoG_l6eHlRa9jslqZlgOG1=w408-h306-k-no'),
    ('-34.5769081', '-58.4850089', 17, 'Butan Bar', 'https://lh5.googleusercontent.com/p/AF1QipONRGGXh1VG2azXqa1rkHRFRBAQx3EzguaHVn5I=s455-k-no'),
    ('-34.5752233', '-58.4790092', 46, 'Gallo Negro', 'https://lh5.googleusercontent.com/p/AF1QipM7K26bGKly2rrU0wpL1FVhHV-TnoTSKU5V9hr_=w408-h263-k-no'),
    ('-34.5735411', '-58.4847657', 50, 'SportClub Urquiza', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAzm8vWuKz7u5oXiUTZb4Ua-ljYbKvL256O0TyavljXmGCSqwSm7ca-TgBJqKc-FFUAn_0znl5pXpUtZr1x3kqSHPGmg1iPS2ZfBJA6w-ABwyP_ihZPEaDFiGmoGsqf_YyEhCcTxpjiyMkkjLMyXECiSnxGhRYo43jDGIjFqJBBcYN1C2GSPE6Vw&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.573499', '-58.48097300000001', 4, 'La Strega Casa de pizzas y empanadas', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAADfs1xwHcM844_EacvcaNvO9BoWJhDDe-D1f9HDRVzoPJVRypFw5Clu9JqcM6wSs48TXCoV9GhOKrMLj5qD85LHdAfc37HOsXu314hFFcJc4VGtzFaw2fz_JVwNPZnP9DEhCgP8WeZUirdnJ6YKBw8KYGGhQeISIDQwo1xics5h9k8wW99RrcBg&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.5722401', '-58.4591666', 10, 'Rapanui', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA3ucf7QCI6vvj8CDzU3L75IRdJ2cLAgEL5W7XgUMBz8-pM6QVD77KrZrqszdHCzAEbcTBiATms0XDIcg4HYPaIzZxiEneYZWPcMGFfnhoUYUaBQLa2chVYDmf-vejChOFEhD9Z5OP4DCUsSYpp9bPLgwNGhTp3dz7_6mg5CL9Bq4NSa2iZf6ekw&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.5879438', '-58.4231557', 5, 'Rapanui', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAu8prf-gPu9RD0RYXtIwNcxgeueaYG8EJSPctide8o2QJHGTcnYF8eHDewEkEpG7HifY-gOI_Hllm3wU7L5cHfEgx2C-Ld-4tNrbNDUUIjJyuu4UXzEusZCKLCFJFVyFdEhD2j5O8Tb8imGptAiAP50HmGhRi2DnrqAxaLYK6ChggskrtqIwOUA&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.568281', '-58.464487', 20, 'Tea Connection', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAfAV3HARuLr6YYY90CzSdMbgv6iHUFLk1KD9In2UIYxu5BPoTqFGh1Grc0uszq6fw1XPH119h6WvqPkoMxeZ0Mxeve0maJACrJGNE9h19A7PgFlUMyVWWxaV8tL_ObdWAEhDMS7j2NyJWW5g-JMgB3OWZGhS9BxfmSNNfPpXz4-AcKQMpeu76CA&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.5758269', '-58.45968019999999', 25, 'The Oldest Resto Bar Belgrano', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAApWnrz4W1HzLUFwr6tc2-S-mHD6id8r9RV_pmSp_7Demk7btmUWxy6tAGXvlwGSUWL2ludfp9BEtqGxzZJRbkjAPtomOS-9wKEB88sv5vj7M-UOQRjBHgcoSFr0CORCC4EhCHXCLCkrZPnfufIEO7-alOGhQ1yWWF_FL7ISKXvW0q_ATjkh9lxw&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.6008528', '-58.44402849999999', 2, 'Azul Marino', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAkr2ePzVWk7wcUW_Bt7G-kyjQXioBF6g07mOkHaM7ZjV-9fweZ6y9B5JzFkbH0GnKHctOY6vMONNqySGt2iGNQPyHZDtNb9aNuMM8O27UxD7H-cLEX0ck1J86kW-IfctzEhCxzq99gsNmcuE-sDmkTI9rGhQAjQlV3thHYy7ruE-PALlIryGwDg&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.5788584', '-58.4696939', 15, 'Farmacity', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAyp58XCEiswU1gaHLH75GRLClEYt0yKm3vExPcDNgcdZ1JVDhw9--HbXhml7awZM9nh7Ls7CrHBL-oRWXMQk5D9UB5phQ1XY0WCuOjqVo4tvQqXm-kmJfKqyc8wNotBZuEhCJ4y842v2JOA58kWvJhJdmGhS4SDjavp2F5ewQKdAvL6py7A8LIg&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.582661', '-58.43444400000001', 14, 'Kentucky', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAfbstxRuGMbWXy68Msdh5Hb9gvAHYs4FLwwSGE9MnIRM1llagMCC2g-kz2EpUXRszXIfbqUml__C4OZCLtdp8T4hxzXVj-FCAoUaRUP0-ohSDCbOXBce9BirogcGwTAUiEhCWGnYMU2fwWLJ44kWn4_8oGhRQlyQ-JTgGGaPu-Yg8xXI3cJ71Gg&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.5572367', '-58.4953249', 200, 'CEMIC', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAANHDj-6fzYfdC-NDfxWMG_pFaZpMCHjYI_Hv7XpWkyktW9No2GWg_VZ4ojsCBT7THL1yfkqjgU94CSizsEyNDx2HSKF1QolbGw2dLahLC0xEdrufXfGirpicl4ceP0maBEhCuHJDLprXcUh0ruMfNR3dsGhR6Znlub640AHmkwWF41-B1qE-aFA&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.6032898', '-58.4108409', 500, 'Hoyts Abasto - Cinemark Hoyts', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAArT84GnVFcDLtYY9PSYxSUKfHqKCp5p6FGXzLNodn2Z4P4bv_i3SGeLQLo4BnAUPkuKfgGchmEcMTaYhzXSCW_YmzHrCfPBiaSj3FNG9f-qI7YSGYl4sEudjCvJXiSetlEhASFn-oKQ-Zh93b7hFjUz_GGhSEOwTC5zY0m2zIfkz1VuI87ByQ1w&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.4907', '-58.48549999999999', 22, 'Bowling Snack - Restaurant', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA1I68kIoX8dlOz7lL0VUUQYbkSGDql18rI9eBUm09DPYthbePW5sRzWbwZrfc3G9AsGgEWhPFu-fYnF64dK94faZq46vgc2VzyHf_R22xWy6a3oTBJD83G8HwBafPeCJOEhAVmtHIq8kkNsJUSO6rVmqtGhSOYGH4krNz2v2ECBdVSuIvXcAVZQ&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.5907597', '-58.4066468', 84, 'Jobs', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA-afkQbx1OBRHGeveQ2tfoDNwib92e0uT47CDCaWIcff6m9GB85OERhxkEA1n4Pcfur8SG0YKLHzH2h4mKsyrD9auXdpzjOPZVcyobAF8d0P8oLM4jMzkJJH70yGDvMR_EhBq4ma3Sp7NuAfMeq54bayZGhQBsXXIG_8EMbaPtvyG_UMDkPB1Qg&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.5587323', '-58.45140600000001', 18, 'Café Martínez', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAArnRAFUrYZwY4jrYZM1f8slNzkn0yvYHtNw3xTdYBukvTwvov_Gb3X-ZSFCaN5XKxixTODFf5olZ48aVUZ4r9Ks0DwtwoJMu3uOqUH1cYcGnA0gUWk0poS5lkxbaB7FdDEhAyX_5ml5APPMwf1qFRsFCiGhQpzcSdHec8i2m6nUfqw3pKd3zDnA&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.611148', '-58.42078799999999', 50, 'Las Violetas', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA7E4dm3pPOn3tXqSfBDLmmS0quR_xxAxHOJgEUf9f2SKS5oJRPmSwGj_viRXEtCJuI732lI52PUTUSQEsAfHjvFphb3diqUekLVTdvlFjVau18Y6SmnV6g6hV3OSgxEFAEhAfvyyiCO3WiOuMO5P4HX7HGhQ8_oZwZylEy4vSno04npAzXvntmg&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.582398', '-58.45193', 31, 'Tienda de Café', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAVoLVPAjzwJiCtnEcPY4zzlFEX6Bc3LWWyavvoAkm5TFq2T5PNglrgrMGNH-f6A3y9LNeXMFbK9E_9k7EzGtv_XaFvBCq3kolMwSRIM9Dxd7DIz3aRzBe1dbyexvKe5gnEhAhH6hSvTtQc9RvW3cww7qPGhQJaOVAkJI_T_-FR06A2-eXeRRRUQ&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.4898067', '-58.48503599999999', 42, 'Starbucks', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAqZYbO4eVDj3jbpa5nnF4dJfjFNVVRjkVDh4oDU46A5Mw3Jry3ZQ6aVoD-oOrNM8HoWcckKMVUAvTyr1UM_QQaBifmc9xlmuPQLvRD50_KQMnTkXaPnDskGGOJLKvkXTSEhDXkhxM42nquRGSJyagTZnOGhQvoExGczaevblUwIhGmZ3IvhZf2Q&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
    ('-34.5424906', '-58.4428131', 1487, 'Facultad de Ciencias Exactas y Naturales', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAaJ1yeMVudVbW9jzUrE5iLowXpmaJGcI_CdUTD_noXb8fmpQkqFgjB8MGf67us5ak_V8P5mAXVt7nDoYVD7aCxMZzuX2VGl8ZeNpfknOVKFhK7U26QeQsIArf9ODtq86XEhAeApO9fK93ULfMI39D1_jiGhSDXOP51qu_ydyRZYRkBK0k3Iurcw&key=AIzaSyD6skzjvRlZwqCFrPQ6n6FyHJpEQV1CslI'),
]

class Command(BaseCommand):
    help = 'Create random data'

    def get_user_data(self):
        genre = random.randint(0, 1)
        name1 = NAMES[random.randint(0,99)][genre]
        name2 = NAMES[random.randint(0,99)][genre]
        email = "{}@{}.com".format(name1.lower(), name2.lower())
        fullname = "{} {}".format(name1, name2)
        return (fullname, email)

    def handle(self, *args, **options):
        self.command = process_contagion_risk.Command()
        USERS_AMOUNT = 300
        self.stdout.write(self.style.NOTICE('Creating {} users'.format(USERS_AMOUNT)))
        users = []
        locations = []

        for n in range(USERS_AMOUNT):
            name, email = self.get_user_data()
            user, created = User.objects.get_or_create(name=name, email=email)
            user.status = 'Healthy'
            user.is_admin = random.randint(0,1)
            user.set_password("12345")
            user.save()
            users.append(user)
        self.stdout.write(self.style.SUCCESS('{} users created'.format(USERS_AMOUNT)))

        self.stdout.write(self.style.NOTICE('Creating {} locations'.format(len(LOCATIONS))))
        for n in range(len(LOCATIONS)):
            (lat, lon, capacity, name, logo) = LOCATIONS[n]
            location, c = Location.objects.get_or_create(**{
                "name": name,
                "description": name,
                "opening_time": '10:00hs',
                "closing_time": '23:00hs',
                "logo": logo,
                "maximum_capacity": capacity,
                "latitude": lat,
                "longitude": lon,
                "created_by": users[n],
            })
            location.save()
            locations.append(location)
        self.stdout.write(self.style.SUCCESS('{} locations created'.format(len(LOCATIONS))))


        self.stdout.write(self.style.NOTICE('Creating randoms checkins'))
        for n in range(31, 0, -1):
            off = timedelta(n)
            date = timezone.now()
            self.stdout.write(self.style.NOTICE('Creating randoms checkins for {}'.format(date-off)))
            self.create_checkins(users, locations, date-off)
            self.create_positive_tests(users, date-off, n > 8)
        self.create_checkins(users, locations, date, False)
        self.stdout.write(self.style.SUCCESS('All checkins generated'))

    def create_positive_tests(self, users, date, add_negative=True):
        k = random.randint(1,5)
        checkin_users = random.sample(users, k)
        for user in checkin_users:
            if user.status == "Healthy":
                test_object = Test.objects.create(
                        is_positive=True,
                        taken_by=user,
                    )
                test_object.date_taken=date
                test_object.processed = False
                test_object.save()
                user.status = "COVID Positive"
                user.save()
                contagion = Contagion.objects.create(reported_by=user)
                contagion.reported_on = date
                contagion.save()

        self.command.handle()

        if add_negative:
            for user in checkin_users:
                test = Test.objects.create(
                        is_positive=False,
                        taken_by=user,
                    )
                test.date_taken=date + timedelta(random.randint(3,8))
                test.processed = False
                test.save()
                user.status="Healthy"
                user.save()

            self.command.handle()

    def create_checkins(self, users, locations, date, close_checkin=True):
        checkout = timedelta(hours=2)
        k_users = int(random.normalvariate(60, 20))
        if k_users < 0:
            k_users = -k_users
        users_to_checkin = random.sample(users, k_users)

        for user in users_to_checkin:
            delta = timedelta(minutes=int(random.normalvariate(0, 80)))
            checkin_at = random.choice(locations)
            while checkin_at._capacity() == 0:
                checkin_at = random.choice(locations)

            checkin = Registry.objects.create(
                registered_by = user,
                included_in = checkin_at
            )
            checkin.entrance_time = date + delta
            if close_checkin:
                checkin.exit_time = checkin.entrance_time + checkout
            checkin.save()